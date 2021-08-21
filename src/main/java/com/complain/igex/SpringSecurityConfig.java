package com.complain.igex;

import com.complain.igex.common.AuthProvider;
import com.complain.igex.provider.CustomOAuth2Provider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    AuthProvider authProvider;

    @Override
    public void configure(WebSecurity web) throws Exception {
        // 허용되어야 할 경로들
        web.ignoring().antMatchers("/static/**",
                "/dist/**",
                "/css/**",
                "/font-awesome/**",
                "/fonts/**",
                "/img/**",
                "/images/**",
                "/js/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // 로그인 설정
        http.authorizeRequests()
                .antMatchers(
                        "/",
                        "/login",
                        "/join",
                        "/join_form",
                        "/adminSet",
                        "/home",
                        "/home2",
                        "/rest/**",
                        "/rest2/**",
                        "/kakao/**",
                        "/error**").permitAll()
                // ROLE_USER, ROLE_ADMIN으로 권한 분리 유알엘 정의
                .antMatchers("/**").access("ROLE_USER")
                .antMatchers("/**").access("ROLE_ADMIN")
                .antMatchers("/admin/**").access("ROLE_ADMIN")
                .antMatchers("/manage/**").access("ROLE_ADMIN")
                .antMatchers("/common/**").access("ROLE_ADMIN")
                .antMatchers("/**").authenticated();
        http
                // 로그인 페이지 및 성공 url, handler 그리고 로그인 시 사용되는 id, password 파라미터 정의
                .formLogin()
                .loginPage("/")
                .loginProcessingUrl("/authenticate")
                .defaultSuccessUrl("/authPage")
                .usernameParameter("id_user")
                .passwordParameter("password");

        http
                // 로그아웃 관련 설정
                .logout().logoutRequestMatcher(new AntPathRequestMatcher("/log_out"))
                .logoutSuccessUrl("/login")
                .invalidateHttpSession(true)
                .and()
                .csrf()
                .csrfTokenRepository(new CookieCsrfTokenRepository())
                .and()
                // 로그인 프로세스가 진행될 provider
                .authenticationProvider(authProvider);
    }


//    @Bean
//    public ClientRegistrationRepository clientRegistrationRepository(
//            OAuth2ClientProperties oAuth2ClientProperties,
//            @Value("${custom.oauth2.kakao.clientId}") String kakaoClientId,
//            @Value("${custom.oauth2.kakao.client-secret}") String kakaoClientSecret
//    ) {
//        List<ClientRegistration> registrations = oAuth2ClientProperties.getRegistration().keySet().stream().map(client -> getRegistration(oAuth2ClientProperties, client)).filter(Objects::nonNull).collect(Collectors.toList());
//
//        registrations.add(CustomOAuth2Provider.KAKAO.getBuilder("kakao").clientId(kakaoClientId).clientSecret(kakaoClientSecret).jwkSetUri("temp").build());
//
//        return new InMemoryClientRegistrationRepository(registrations);
//    }

}
