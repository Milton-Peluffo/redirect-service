import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoDb } from '../utils/db.js';

const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const shortCode = event.pathParameters?.shortCode;
  console.log(`[INFO] [HANDLER] Intento de redirección recibido para el código: ${shortCode}`);

  try {
    if (!TABLE_NAME) {
      console.error('[ERROR] [HANDLER] TABLE_NAME no configurada en las variables de entorno');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Configuración interna del servidor incompleta' }),
      };
    }

    if (!shortCode) {
      console.warn('[WARN] [HANDLER] No se proporcionó ningún código en la ruta');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'El código de redirección es requerido' }),
      };
    }

    console.log(`[INFO] [HANDLER] Incrementando clics y obteniendo URL para: ${shortCode}`);
    
    const response = await dynamoDb.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { shortCode },
        UpdateExpression: 'SET clicks = if_not_exists(clicks, :start) + :inc',
        ExpressionAttributeValues: {
          ':inc': 1,
          ':start': 0
        },
        ReturnValues: 'ALL_NEW'
      })
    );

    if (!response.Attributes) {
      console.warn(`[WARN] [HANDLER] Código no encontrado en la base de datos: ${shortCode}`);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'El código solicitado no existe o ha expirado' }),
      };
    }

    const { longUrl, clicks } = response.Attributes;
    console.log(`[INFO] [HANDLER] Clic registrado. Total clics actuales: ${clicks}. Redireccionando a: ${longUrl}`);

    return {
      statusCode: 302,
      headers: {
        Location: longUrl,
        'Cache-Control': 'no-cache',
      },
      body: '',
    };
  } catch (error) {
    console.error('[ERROR] [HANDLER] Error inesperado en el handler de redirección', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Ocurrió un error interno al procesar la redirección' }),
    };
  }
};