package com.programming.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

// Pq configurar o CORs?
// Para o seu backEnd, vc está dizendo: "Eu, backEnd, permito que o frontEnd específico me acesse."
// Sem essa configuração, o navegador por padrão, irá bloquear as requisições usando o CORs.
@Configuration
public class configCors {

    // Por estarmos usando o modo Gateway, o nosso front-end precisa passar pelo gateway antes de chegar
    // em nossa aplicação.
    // É necessário configurar a configuração padrão abaixo.
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://127.0.0.1:5500"); // Permite o front-end local
        config.addAllowedMethod("*"); // Permite todos os métodos
        config.addAllowedHeader("*"); // Permite todos os cabeçalhos
        config.setAllowCredentials(true); // Permite credenciais

        // UrlBasedCorsConfigurationSource -> Quando aplicamos ela, queremos dizer ao Spring para aplicar toda a
        // regra de CORs em toda a nossas requisições
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        // Sendo o "/**" -> Todas as rotas do meu BackEnd devem aplicar as configurações acima.

        return new CorsWebFilter(source);
    }
}

