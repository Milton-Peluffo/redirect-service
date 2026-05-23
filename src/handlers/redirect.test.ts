describe('Redirect Handler - Tests básicos', () => {
  it('debería poder importar el handler sin errores', () => {
    expect(() => {
      require('./redirect');
    }).not.toThrow();
  });

  it('debería exportar una función handler', () => {
    const module = require('./redirect');
    expect(module).toHaveProperty('handler');
    expect(typeof module.handler).toBe('function');
  });

  it('debería poder importar el módulo db sin errores', () => {
    expect(() => {
      require('../utils/db');
    }).not.toThrow();
  });

  it('debería exportar dynamoDb desde el módulo db', () => {
    const dbModule = require('../utils/db');
    expect(dbModule).toHaveProperty('dynamoDb');
  });
});
