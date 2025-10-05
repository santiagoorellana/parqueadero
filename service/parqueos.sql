--
-- PostgreSQL database dump
-- Este es el dump de la tabla llamada "parqueos" donde se encuentran los datos 
-- de la disponibilidad de los parqueaderos. Esos datos de disponibilidad son 
-- actualizados por otra aplicacion independiente que tambien tiene acceso a la
-- tabla "parqueos".
-- Para la prueba de ejecucion de la aplicacion, la base de datos donde se debe 
-- crear la tabla, debe tener las siguientes caracteristicas...
-- port: 5433,
-- database: 'parqueos',
-- user: 'postgres',
-- password: 'admin'
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2023-05-15 06:34:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16395)
-- Name: parqueos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parqueos (
    id_parqueadero integer NOT NULL,
    id_zona integer,
    numero integer,
    estado integer
);


ALTER TABLE public.parqueos OWNER TO postgres;

--
-- TOC entry 3310 (class 0 OID 0)
-- Dependencies: 209
-- Name: TABLE parqueos; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.parqueos IS 'En esta tabla se guardan los datos de cada parqueadero y su disponibilidad.';


--
-- TOC entry 3304 (class 0 OID 16395)
-- Dependencies: 209
-- Data for Name: parqueos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parqueos (id_parqueadero, id_zona, numero, estado) FROM stdin;
1	1	1	0
2	1	2	0
3	1	3	1
4	1	4	0
5	1	5	1
6	2	6	0
7	2	7	1
8	2	8	1
9	2	9	0
10	2	10	0
11	3	11	1
12	3	12	1
13	3	13	0
14	3	14	1
15	3	15	0
16	4	16	1
17	4	17	1
18	4	18	0
19	4	19	0
20	4	20	1
21	1	21	1
22	2	22	1
23	3	23	0
24	4	24	0
\.


--
-- TOC entry 3164 (class 2606 OID 16399)
-- Name: parqueos parqueos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parqueos
    ADD CONSTRAINT parqueos_pkey PRIMARY KEY (id_parqueadero);


-- Completed on 2023-05-15 06:34:23

--
-- PostgreSQL database dump complete
--

