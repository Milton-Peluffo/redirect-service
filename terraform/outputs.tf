output "redirect_api_url" {
  description = "URL base del servicio de redirección."
  value       = aws_apigatewayv2_api.http_api.api_endpoint
}