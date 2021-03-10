package com.onus.onlinebookstore.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;

@Configuration
public class repositoryConfig implements RepositoryRestConfigurer {

	private final EntityManager entityManager;

	public repositoryConfig(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public void configureRepositoryRestConfiguration(

		RepositoryRestConfiguration config, CorsRegistry cors) {
//	Expose ID field in the REST endpoints
		config.exposeIdsFor(entityManager.getMetamodel()
			.getEntities()
			.stream()
				.map(Type::getJavaType)
				.toArray(Class[]::new));

//	Configure global CORS for all endpoints
		cors.addMapping("/**")
			.allowedOrigins("*");

	}
}
