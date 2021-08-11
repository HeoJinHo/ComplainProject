package com.complain.igex;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter
{
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
                .antMatchers("/", "/login", "/join", "/join_form", "/adminSet", "/home", "/home2", "/error**").permitAll()
                // ROLE_USER, ROLE_ADMIN으로 권한 분리 유알엘 정의
                .antMatchers("/**").access("ROLE_USER")
                .antMatchers("/**").access("ROLE_ADMIN")
                .antMatchers("/admin/**").access("ROLE_ADMIN")
                .antMatchers("/manage/**").access("ROLE_ADMIN")
                .antMatchers("/**").authenticated();
        http
                // 로그인 페이지 및 성공 url, handler 그리고 로그인 시 사용되는 id, password 파라미터 정의
                .formLogin()
                .loginPage("/")
                .loginProcessingUrl("/authenticate")
                .defaultSuccessUrl("/authPage")
                .usernameParameter("id_user")
                .passwordParameter("password");
    }

}
