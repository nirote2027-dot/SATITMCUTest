--
-- PostgreSQL database dump
--

\restrict t1VjGl69UIL7xo4fknDcwI89gSpFRqj7QQ6RCuscAUrP2gX31BQoG4Lh7uui2Ps

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.user_tenants DROP CONSTRAINT IF EXISTS user_tenants_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.user_tenants DROP CONSTRAINT IF EXISTS user_tenants_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.user_roles DROP CONSTRAINT IF EXISTS user_roles_user_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_id_fkey;
ALTER TABLE IF EXISTS ONLY public.sample_items DROP CONSTRAINT IF EXISTS sample_items_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.role_permissions DROP CONSTRAINT IF EXISTS role_permissions_role_id_fkey;
ALTER TABLE IF EXISTS ONLY public.role_permissions DROP CONSTRAINT IF EXISTS role_permissions_permission_id_fkey;
ALTER TABLE IF EXISTS ONLY public.reservations DROP CONSTRAINT IF EXISTS reservations_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.reservations DROP CONSTRAINT IF EXISTS reservations_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.reservations DROP CONSTRAINT IF EXISTS reservations_facility_id_fkey;
ALTER TABLE IF EXISTS ONLY public.facilities DROP CONSTRAINT IF EXISTS facilities_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.employees DROP CONSTRAINT IF EXISTS employees_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.employees DROP CONSTRAINT IF EXISTS employees_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.employees DROP CONSTRAINT IF EXISTS employees_department_id_fkey;
ALTER TABLE IF EXISTS ONLY public.documents DROP CONSTRAINT IF EXISTS documents_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.documents DROP CONSTRAINT IF EXISTS documents_requester_id_fkey;
ALTER TABLE IF EXISTS ONLY public.departments DROP CONSTRAINT IF EXISTS departments_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.departments DROP CONSTRAINT IF EXISTS departments_parent_id_fkey;
ALTER TABLE IF EXISTS ONLY public.curriculums DROP CONSTRAINT IF EXISTS curriculums_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.curriculums DROP CONSTRAINT IF EXISTS curriculums_department_id_fkey;
ALTER TABLE IF EXISTS ONLY public.courses DROP CONSTRAINT IF EXISTS courses_curriculum_id_fkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.auth_tokens DROP CONSTRAINT IF EXISTS auth_tokens_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_actor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.articles DROP CONSTRAINT IF EXISTS articles_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.articles DROP CONSTRAINT IF EXISTS articles_category_id_fkey;
ALTER TABLE IF EXISTS ONLY public.articles DROP CONSTRAINT IF EXISTS articles_author_id_fkey;
ALTER TABLE IF EXISTS ONLY public.approval_steps DROP CONSTRAINT IF EXISTS approval_steps_document_id_fkey;
ALTER TABLE IF EXISTS ONLY public.approval_steps DROP CONSTRAINT IF EXISTS approval_steps_approver_role_id_fkey;
DROP INDEX IF EXISTS public.users_email_key;
DROP INDEX IF EXISTS public.user_tenants_user_id_tenant_id_key;
DROP INDEX IF EXISTS public.user_tenants_tenant_id_idx;
DROP INDEX IF EXISTS public.user_roles_user_tenant_id_role_id_scope_type_scope_id_key;
DROP INDEX IF EXISTS public.user_roles_role_id_idx;
DROP INDEX IF EXISTS public.tenants_code_key;
DROP INDEX IF EXISTS public.sample_items_tenant_id_idx;
DROP INDEX IF EXISTS public.roles_tenant_id_code_key;
DROP INDEX IF EXISTS public.reservations_tenant_id_idx;
DROP INDEX IF EXISTS public.reservations_facility_id_idx;
DROP INDEX IF EXISTS public.permissions_code_key;
DROP INDEX IF EXISTS public.facilities_tenant_id_idx;
DROP INDEX IF EXISTS public.employees_tenant_id_idx;
DROP INDEX IF EXISTS public.employees_tenant_id_employee_code_key;
DROP INDEX IF EXISTS public.documents_tenant_id_idx;
DROP INDEX IF EXISTS public.documents_tenant_id_doc_no_key;
DROP INDEX IF EXISTS public.departments_tenant_id_idx;
DROP INDEX IF EXISTS public.departments_parent_id_idx;
DROP INDEX IF EXISTS public.curriculums_tenant_id_idx;
DROP INDEX IF EXISTS public.curriculums_tenant_id_code_key;
DROP INDEX IF EXISTS public.curriculums_department_id_idx;
DROP INDEX IF EXISTS public.courses_curriculum_id_course_code_key;
DROP INDEX IF EXISTS public.categories_tenant_id_slug_key;
DROP INDEX IF EXISTS public.categories_tenant_id_idx;
DROP INDEX IF EXISTS public.auth_tokens_user_id_purpose_idx;
DROP INDEX IF EXISTS public.auth_tokens_token_hash_key;
DROP INDEX IF EXISTS public.audit_logs_tenant_id_entity_entity_id_idx;
DROP INDEX IF EXISTS public.audit_logs_tenant_id_created_at_idx;
DROP INDEX IF EXISTS public.articles_tenant_id_idx;
DROP INDEX IF EXISTS public.approval_steps_document_id_step_order_key;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.user_tenants DROP CONSTRAINT IF EXISTS user_tenants_pkey;
ALTER TABLE IF EXISTS ONLY public.user_roles DROP CONSTRAINT IF EXISTS user_roles_pkey;
ALTER TABLE IF EXISTS ONLY public.tenants DROP CONSTRAINT IF EXISTS tenants_pkey;
ALTER TABLE IF EXISTS ONLY public.sample_items DROP CONSTRAINT IF EXISTS sample_items_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_pkey;
ALTER TABLE IF EXISTS ONLY public.role_permissions DROP CONSTRAINT IF EXISTS role_permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.reservations DROP CONSTRAINT IF EXISTS reservations_pkey;
ALTER TABLE IF EXISTS ONLY public.permissions DROP CONSTRAINT IF EXISTS permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.login_throttles DROP CONSTRAINT IF EXISTS login_throttles_pkey;
ALTER TABLE IF EXISTS ONLY public.facilities DROP CONSTRAINT IF EXISTS facilities_pkey;
ALTER TABLE IF EXISTS ONLY public.employees DROP CONSTRAINT IF EXISTS employees_pkey;
ALTER TABLE IF EXISTS ONLY public.documents DROP CONSTRAINT IF EXISTS documents_pkey;
ALTER TABLE IF EXISTS ONLY public.departments DROP CONSTRAINT IF EXISTS departments_pkey;
ALTER TABLE IF EXISTS ONLY public.curriculums DROP CONSTRAINT IF EXISTS curriculums_pkey;
ALTER TABLE IF EXISTS ONLY public.courses DROP CONSTRAINT IF EXISTS courses_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_tokens DROP CONSTRAINT IF EXISTS auth_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_pkey;
ALTER TABLE IF EXISTS ONLY public.articles DROP CONSTRAINT IF EXISTS articles_pkey;
ALTER TABLE IF EXISTS ONLY public.approval_steps DROP CONSTRAINT IF EXISTS approval_steps_pkey;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.user_tenants;
DROP TABLE IF EXISTS public.user_roles;
DROP TABLE IF EXISTS public.tenants;
DROP TABLE IF EXISTS public.sample_items;
DROP TABLE IF EXISTS public.roles;
DROP TABLE IF EXISTS public.role_permissions;
DROP TABLE IF EXISTS public.reservations;
DROP TABLE IF EXISTS public.permissions;
DROP TABLE IF EXISTS public.login_throttles;
DROP TABLE IF EXISTS public.facilities;
DROP TABLE IF EXISTS public.employees;
DROP TABLE IF EXISTS public.documents;
DROP TABLE IF EXISTS public.departments;
DROP TABLE IF EXISTS public.curriculums;
DROP TABLE IF EXISTS public.courses;
DROP TABLE IF EXISTS public.categories;
DROP TABLE IF EXISTS public.auth_tokens;
DROP TABLE IF EXISTS public.audit_logs;
DROP TABLE IF EXISTS public.articles;
DROP TABLE IF EXISTS public.approval_steps;
DROP TYPE IF EXISTS public."TokenPurpose";
DROP TYPE IF EXISTS public."ScopeType";
DROP TYPE IF EXISTS public."ReservationStatus";
DROP TYPE IF EXISTS public."FacilityType";
DROP TYPE IF EXISTS public."FacilityStatus";
DROP TYPE IF EXISTS public."DocStatus";
DROP TYPE IF EXISTS public."CourseType";
DROP TYPE IF EXISTS public."ArticleStatus";
DROP TYPE IF EXISTS public."ApprovalStatus";
--
-- Name: ApprovalStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ApprovalStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."ApprovalStatus" OWNER TO postgres;

--
-- Name: ArticleStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ArticleStatus" AS ENUM (
    'DRAFT',
    'SCHEDULED',
    'PUBLISHED',
    'ARCHIVED'
);


ALTER TYPE public."ArticleStatus" OWNER TO postgres;

--
-- Name: CourseType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."CourseType" AS ENUM (
    'CORE',
    'ELECTIVE'
);


ALTER TYPE public."CourseType" OWNER TO postgres;

--
-- Name: DocStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."DocStatus" AS ENUM (
    'DRAFT',
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."DocStatus" OWNER TO postgres;

--
-- Name: FacilityStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."FacilityStatus" AS ENUM (
    'AVAILABLE',
    'MAINTENANCE'
);


ALTER TYPE public."FacilityStatus" OWNER TO postgres;

--
-- Name: FacilityType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."FacilityType" AS ENUM (
    'ROOM',
    'VEHICLE'
);


ALTER TYPE public."FacilityType" OWNER TO postgres;

--
-- Name: ReservationStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ReservationStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'CANCELLED'
);


ALTER TYPE public."ReservationStatus" OWNER TO postgres;

--
-- Name: ScopeType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ScopeType" AS ENUM (
    'ALL',
    'CAMPUS',
    'ORG_UNIT'
);


ALTER TYPE public."ScopeType" OWNER TO postgres;

--
-- Name: TokenPurpose; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TokenPurpose" AS ENUM (
    'EMAIL_VERIFY',
    'PASSWORD_RESET'
);


ALTER TYPE public."TokenPurpose" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: approval_steps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.approval_steps (
    id uuid NOT NULL,
    document_id uuid NOT NULL,
    approver_role_id uuid NOT NULL,
    step_order integer NOT NULL,
    status public."ApprovalStatus" DEFAULT 'PENDING'::public."ApprovalStatus" NOT NULL,
    comment text,
    action_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.approval_steps OWNER TO postgres;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    category_id uuid,
    author_id uuid,
    title character varying(255) NOT NULL,
    content text,
    cover_image character varying(500),
    status public."ArticleStatus" DEFAULT 'DRAFT'::public."ArticleStatus" NOT NULL,
    published_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    content_en text,
    title_en character varying(255)
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_logs (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    actor_id uuid,
    action character varying(100) NOT NULL,
    entity character varying(50) NOT NULL,
    entity_id character varying(64) NOT NULL,
    before jsonb,
    after jsonb,
    ip character varying(64),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO postgres;

--
-- Name: auth_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    purpose public."TokenPurpose" NOT NULL,
    token_hash character varying(128) NOT NULL,
    payload jsonb,
    expires_at timestamp with time zone NOT NULL,
    used_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.auth_tokens OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id uuid NOT NULL,
    curriculum_id uuid NOT NULL,
    course_code character varying(100) NOT NULL,
    name character varying(255) NOT NULL,
    credits integer NOT NULL,
    semester integer,
    course_type public."CourseType" DEFAULT 'CORE'::public."CourseType" NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: curriculums; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.curriculums (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    code character varying(100) NOT NULL,
    name character varying(255) NOT NULL,
    degree_level character varying(100) NOT NULL,
    total_credits integer NOT NULL,
    description text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    image_url character varying(500),
    department_id uuid,
    career_prospects text,
    curriculum_year character varying(20),
    degree_name_en character varying(255),
    degree_name_th character varying(255),
    duration_years integer DEFAULT 4,
    elective_credits integer,
    ge_credits integer,
    major_credits integer,
    name_en character varying(255),
    objectives text,
    pdf_url character varying(500),
    philosophy text
);


ALTER TABLE public.curriculums OWNER TO postgres;

--
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    parent_id uuid,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    code character varying(50),
    description text
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- Name: documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documents (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    requester_id uuid NOT NULL,
    doc_no character varying(100) NOT NULL,
    title character varying(255) NOT NULL,
    doc_type character varying(100) NOT NULL,
    file_url character varying(500),
    status public."DocStatus" DEFAULT 'DRAFT'::public."DocStatus" NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.documents OWNER TO postgres;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    user_id uuid,
    department_id uuid,
    employee_code character varying(100) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    "position" character varying(255),
    contact_info jsonb,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    image_url character varying(500)
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: facilities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facilities (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    type public."FacilityType" NOT NULL,
    name character varying(255) NOT NULL,
    capacity integer,
    status public."FacilityStatus" DEFAULT 'AVAILABLE'::public."FacilityStatus" NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    image_url character varying(500)
);


ALTER TABLE public.facilities OWNER TO postgres;

--
-- Name: login_throttles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login_throttles (
    key character varying(320) NOT NULL,
    fail_count integer DEFAULT 0 NOT NULL,
    locked_until timestamp with time zone,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.login_throttles OWNER TO postgres;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id uuid NOT NULL,
    code character varying(100) NOT NULL,
    module character varying(50) NOT NULL,
    action character varying(50) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservations (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    facility_id uuid NOT NULL,
    user_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    status public."ReservationStatus" DEFAULT 'PENDING'::public."ReservationStatus" NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.reservations OWNER TO postgres;

--
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permissions (
    role_id uuid NOT NULL,
    permission_id uuid NOT NULL
);


ALTER TABLE public.role_permissions OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    code character varying(50) NOT NULL,
    name_th character varying(100) NOT NULL,
    name_en character varying(100) NOT NULL,
    description character varying(500),
    is_system boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: sample_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sample_items (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    status character varying(50) DEFAULT 'ACTIVE'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.sample_items OWNER TO postgres;

--
-- Name: tenants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tenants (
    id uuid NOT NULL,
    code character varying(50) NOT NULL,
    name_th character varying(255) NOT NULL,
    name_en character varying(255) NOT NULL,
    logo_url character varying(500),
    settings jsonb DEFAULT '{}'::jsonb NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.tenants OWNER TO postgres;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id uuid NOT NULL,
    user_tenant_id uuid NOT NULL,
    role_id uuid NOT NULL,
    scope_type public."ScopeType" DEFAULT 'ALL'::public."ScopeType" NOT NULL,
    scope_id uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: user_tenants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_tenants (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    joined_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_tenants OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255),
    name character varying(255) NOT NULL,
    image_url character varying(500),
    provider character varying(20) DEFAULT 'credentials'::character varying NOT NULL,
    provider_id character varying(255),
    email_verified boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    must_change_password boolean DEFAULT false NOT NULL,
    locale character varying(5),
    last_login_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: approval_steps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.approval_steps (id, document_id, approver_role_id, step_order, status, comment, action_at, created_at) FROM stdin;
\.


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (id, tenant_id, category_id, author_id, title, content, cover_image, status, published_at, created_at, updated_at, content_en, title_en) FROM stdin;
3373fb79-4019-4b97-ac65-739c033fbe6b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	e665ca42-7399-4354-bb6b-f9b75deb9829	โรงเรียนสาธิต มจร เปิดรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2569	โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ประกาศเปิดรับสมัครนักเรียนระดับชั้นมัธยมศึกษาปีที่ 1 และ 4 ประจำปีการศึกษา 2569 ผู้สนใจสามารถยื่นใบสมัครออนไลน์ได้ตั้งแต่วันนี้เป็นต้นไป	\N	DRAFT	\N	2026-09-12 04:07:51.504+07	2026-09-12 04:07:51.504+07	MCU Demonstration School announces the opening of admissions for Grade 7 and Grade 10 students for the 2026 academic year. Interested candidates can apply online starting today.	MCU Demonstration School Opens Admissions for Academic Year 2026
98166693-5fec-4134-bafa-400ee8491e42	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	e665ca42-7399-4354-bb6b-f9b75deb9829	โรงเรียนสาธิต มจร เปิดรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2569	<p>โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ประกาศเปิดรับสมัครนักเรียนระดับชั้นมัธยมศึกษาปีที่ 1 และ 4 ประจำปีการศึกษา 2569</p>\n<h3>คุณสมบัติของผู้สมัคร</h3>\n<ul>\n  <li>กำลังศึกษาอยู่ในระดับชั้นประถมศึกษาปีที่ 6 หรือมัธยมศึกษาปีที่ 3</li>\n  <li>มีความประพฤติเรียบร้อย มีความสนใจศึกษาด้านคุณธรรม จริยธรรม และวิชาการ</li>\n</ul>\n<p>ผู้สนใจสามารถยื่นใบสมัครออนไลน์ได้ตั้งแต่วันนี้เป็นต้นไป สอบถามรายละเอียดเพิ่มเติมได้ที่ห้องประชาสัมพันธ์</p>	\N	PUBLISHED	\N	2026-09-12 04:07:09.057+07	2026-09-12 06:29:06.009+07	<p>MCU Demonstration School announces the opening of admissions for Grade 7 and Grade 10 students for the 2026 academic year.</p>\n<h3>Applicant Qualifications</h3>\n<ul>\n  <li>Currently studying in Grade 6 or Grade 9</li>\n  <li>Good conduct with a keen interest in ethics, moral values, and academic excellence</li>\n</ul>\n<p>Interested candidates can apply online starting today. For more information, please contact the Public Relations Office.</p>	MCU Demonstration School Opens Admissions for Academic Year 2026
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit_logs (id, tenant_id, actor_id, action, entity, entity_id, before, after, ip, created_at) FROM stdin;
eb5425f2-f80a-452d-b907-bf101403a0fe	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e665ca42-7399-4354-bb6b-f9b75deb9829	tenant.settings_update	tenant	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	{"code": "DEMO", "nameEn": "Sample Organization", "nameTh": "องค์กรตัวอย่าง", "logoUrl": null, "palette": "blue"}	{"nameEn": "Sample Organization", "nameTh": "องค์กรตัวอย่าง", "actorId": "e665ca42-7399-4354-bb6b-f9b75deb9829", "logoUrl": "/uploads/cfd0ca66-3918-4fd8-aeaf-73bc0a81479a.jpg", "palette": "blue", "tenantId": "f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d"}	\N	2026-09-11 03:11:14.925+07
6fa2c261-09c8-440f-bdf7-5fb2fa6532cf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e665ca42-7399-4354-bb6b-f9b75deb9829	tenant.settings_update	tenant	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	{"code": "DEMO", "nameEn": "Sample Organization", "nameTh": "องค์กรตัวอย่าง", "logoUrl": "/uploads/cfd0ca66-3918-4fd8-aeaf-73bc0a81479a.jpg", "palette": "blue"}	{"nameEn": "Sample Organization", "nameTh": "องค์กรตัวอย่าง", "actorId": "e665ca42-7399-4354-bb6b-f9b75deb9829", "logoUrl": "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg", "palette": "blue", "tenantId": "f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d"}	\N	2026-09-11 03:21:22.517+07
f75b233c-dd2d-4eef-bede-628dcfc66489	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e665ca42-7399-4354-bb6b-f9b75deb9829	tenant.settings_update	tenant	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	{"code": "DEMO", "smtp": {"from": "นิโรจน์ วงศ์เมืองแก่น <hero2027@gmail.com>", "host": "smtp.gmail.com", "pass": "********", "port": 465, "user": "hero2027@gmail.com", "secure": true}, "nameEn": "Sample Organization", "nameTh": "องค์กรตัวอย่าง", "logoUrl": "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg", "palette": "blue"}	{"nameEn": "Sample Organization", "nameTh": "องค์กรตัวอย่าง", "actorId": "e665ca42-7399-4354-bb6b-f9b75deb9829", "logoUrl": "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg", "palette": "blue", "smtpFrom": "นิโรจน์ วงศ์เมืองแก่น <hero2027@gmail.com>", "smtpHost": "smtp.gmail.com", "smtpPass": "********", "smtpPort": 465, "smtpUser": "hero2027@gmail.com", "tenantId": "f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d", "smtpSecure": true}	\N	2026-09-11 09:40:35.85+07
b2688458-7bd1-4815-83ec-3737b553e181	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e665ca42-7399-4354-bb6b-f9b75deb9829	tenant.settings_update	tenant	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	{"code": "DEMO", "smtp": {"from": "นิโรจน์ วงศ์เมืองแก่น <hero2027@gmail.com>", "host": "smtp.gmail.com", "pass": "********", "port": 465, "user": "hero2027@gmail.com", "secure": true}, "nameEn": "Sample Organization", "nameTh": "องค์กรตัวอย่าง", "logoUrl": "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg", "palette": "blue"}	{"nameEn": "SATIT MCU", "nameTh": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "actorId": "e665ca42-7399-4354-bb6b-f9b75deb9829", "logoUrl": "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg", "palette": "blue", "smtpFrom": "นิโรจน์ วงศ์เมืองแก่น <hero2027@gmail.com>", "smtpHost": "smtp.gmail.com", "smtpPass": "********", "smtpPort": 465, "smtpUser": "hero2027@gmail.com", "tenantId": "f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d", "smtpSecure": true}	\N	2026-09-11 09:52:39.656+07
b36f6538-5c02-4d5e-a22a-72cddcabd974	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e665ca42-7399-4354-bb6b-f9b75deb9829	user.import	user	e56ff9bd-eee2-46f7-9969-b822fe0cbe7a	\N	{"name": "สมชาย ใจดี", "role": "STAFF", "email": "somchai@satit.mcu.ac.th"}	\N	2026-09-12 07:21:20.405+07
ee352926-07bf-4dc4-a282-496c5f3edeef	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e665ca42-7399-4354-bb6b-f9b75deb9829	user.import	user	f83eae06-3b6c-47a4-ad26-4a6350d2f22a	\N	{"name": "สมศรี รักเรียน", "role": "VIEWER", "email": "somsri@satit.mcu.ac.th"}	\N	2026-09-12 07:21:20.854+07
5d13befc-a6d1-4ba9-82f4-00a43cd4ce53	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e665ca42-7399-4354-bb6b-f9b75deb9829	user.import	user	b9b589e5-8938-478b-a419-9e32a492b658	\N	{"name": "อาจารย์อรรถพล จอมมงคล", "role": "SUPER_ADMIN", "email": "raysfksjfk@gmail.com"}	\N	2026-09-12 07:21:21.338+07
40cac429-a79b-4853-80a9-f288f8498aa1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e665ca42-7399-4354-bb6b-f9b75deb9829	user.import	user	19ff7a93-fc4c-4265-8ecb-e75d0e9b1a6f	\N	{"name": "อาจารย์นิโรจน์ วงศ์เมืองแก่น", "role": "SUPER_ADMIN", "email": "raysf5jfk@gmail.com"}	\N	2026-09-12 07:21:21.825+07
820a6ba6-70b5-42ff-aa74-cc058e1e2efa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e665ca42-7399-4354-bb6b-f9b75deb9829	user.import	user	e6631061-fa77-4f80-ba43-e35cf6e918e7	\N	{"name": "พระมหาศุภชัย สุญาโณ", "role": "STAFF", "email": "raysf5t53tksjfk@gmail.com"}	\N	2026-09-12 07:21:22.318+07
\.


--
-- Data for Name: auth_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_tokens (id, user_id, purpose, token_hash, payload, expires_at, used_at, created_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, tenant_id, name, slug, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, curriculum_id, course_code, name, credits, semester, course_type, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: curriculums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.curriculums (id, tenant_id, code, name, degree_level, total_credits, description, is_active, created_at, updated_at, image_url, department_id, career_prospects, curriculum_year, degree_name_en, degree_name_th, duration_years, elective_credits, ge_credits, major_credits, name_en, objectives, pdf_url, philosophy) FROM stdin;
05dfcfe4-e65b-4d90-a1a2-48a0e38e1a80	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	01001	หลักสูตรพุทธศาสตรบัณฑิต สาขาวิชาพระพุทธศาสนา	ปริญญาตรี (4 ปี)	132	หลักสูตรมุ่งเน้นการศึกษาหลักพุทธธรรม ปรัชญา และการประยุกต์ใช้เพื่อสันติสุขของสังคม	t	2026-09-12 03:46:28.469+07	2026-09-12 03:46:28.469+07	\N	d1000000-0000-0000-0000-000000000001	อาจารย์สอนวิชาพระพุทธศาสนา/สังคมศึกษา, นักวิชาการศาสนา, พระวิปัสสนาจารย์/ผู้นำเผยแผ่ศาสนา, เจ้าหน้าที่ฝ่ายบุคคลหรือองค์กรพัฒนาเอกชน	2567	Bachelor of Arts (Buddhism)	พุทธศาสตรบัณฑิต (พระพุทธศาสนา)	4	6	30	96	Bachelor of Arts Program in Buddhism	1. เพื่อผลิตบัณฑิตให้มีความรู้ความเชี่ยวชาญในพระพุทธศาสนาทั้งภาคทฤษฎีและปฏิบัติ\n2. เพื่อสร้างผู้นำทางจิตวิญญาณที่มีคุณธรรมและจริยธรรม\n3. เพื่อเผยแผ่หลักธรรมคำสอนสู่สังคมไทยและสากล	/uploads/sample-tqf2.pdf	มุ่งผลิตบัณฑิตให้มีความรู้ความเข้าใจในพระไตรปิฎก หลักธรรมทางพระพุทธศาสนาอย่างถ่องแท้ มีคุณธรรมจริยธรรม และสามารถประยุกต์ใช้เพื่อการพัฒนาจิตใจและสังคม
7783b865-a199-4691-81cc-9cffef186636	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	01002	หลักสูตรครุศาสตรบัณฑิต สาขาวิชาการสอนพระพุทธศาสนาและสังคมศึกษา	ปริญญาตรี (4 ปี)	138	เตรียมความพร้อมวิชาชีพครูด้วยจิตวิญญาณพุทธปัญญา นวัตกรรมการสอนที่ทันสมัย	t	2026-09-12 03:46:28.482+07	2026-09-12 03:46:28.482+07	\N	d1000000-0000-0000-0000-000000000002	ครูผู้สอนวิชาพระพุทธศาสนาและสังคมศึกษาในสถานศึกษาขั้นพื้นฐาน, นักวิชาการศึกษา, นักพัฒนาสื่อและนวัตกรรมการเรียนรู้	2566	Bachelor of Education (Teaching Buddhism and Social Studies)	ครุศาสตรบัณฑิต (การสอนพระพุทธศาสนาและสังคมศึกษา)	4	6	30	102	Bachelor of Education Program in Teaching Buddhism and Social Studies	1. เพื่อผลิตครูและบุคลากรทางการศึกษาที่มีความรู้ความสามารถในศาสตร์การสอนวิถีพุทธ\n2. เพื่อส่งเสริมวิจัยและนวัตกรรมการจัดการเรียนรู้ในยุคดิจิทัล	/uploads/sample-tqf2.pdf	มุ่งพัฒนาครูผู้สอนที่มีจิตวิญญาณความเป็นครู มีสมรรถนะการจัดการเรียนรู้เชิงรุก (Active Learning) ผสานเทคโนโลยีดิจิทัลและคุณธรรมวิถีพุทธ
719045ed-a95e-4854-ab5f-8c7acea8c822	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	01003	หลักสูตรศิลปศาสตรบัณฑิต สาขาวิชาภาษาอังกฤษเพื่อการสื่อสารสากล	ปริญญาตรี (4 ปี)	130	ภาษาอังกฤษเพื่อการสื่อสารระดับนานาชาติ เชื่อมโยงวัฒนธรรมและพุทธปัญญาสู่สากล	t	2026-09-12 03:46:28.488+07	2026-09-12 03:46:28.488+07	\N	d1000000-0000-0000-0000-000000000003	นักแปลและล่าม, เจ้าหน้าที่วิเทศสัมพันธ์, มัคคุเทศก์, ผู้ประสานงานโครงการระหว่างประเทศ, ครูผู้สอนภาษาอังกฤษ	2567	Bachelor of Arts (English for Global Communication)	ศิลปศาสตรบัณฑิต (ภาษาอังกฤษเพื่อการสื่อสารสากล)	4	6	30	94	Bachelor of Arts Program in English for Global Communication	1. เพื่อผลิตบัณฑิตที่มีสมรรถนะการใช้ภาษาอังกฤษเพื่อการสื่อสารระดับสูง\n2. เพื่อเตรียมความพร้อมสู่การทำงานในองค์กรระหว่างประเทศ	/uploads/sample-tqf2.pdf	มุ่งผลิตบัณฑิตที่มีทักษะภาษาอังกฤษระดับสากล มีความเข้าใจในความหลากหลายทางวัฒนธรรม และประยุกต์ใช้เพื่อการเผยแผ่และการทำงานในเวทีโลก
5a3da450-337c-4b88-b01e-ebf57da78196	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	CURR-LANG-M4	หลักสูตรภาษาและวัฒนธรรมสากล มัธยมศึกษาตอนปลาย	HIGH_SCHOOL	81	หลักสูตรเน้นความเชี่ยวชาญด้านภาษาอังกฤษ ภาษาต่างประเทศที่สอง และการสื่อสารข้ามวัฒนธรรม	t	2026-09-12 02:47:31.472+07	2026-09-12 06:29:05.995+07	\N	d1000000-0000-0000-0000-000000000002	\N	2568	\N	มัธยมศึกษาตอนปลาย	4	12	30	39	Language & Global Culture Curriculum	\N	\N	\N
db12bc94-57c3-4991-be3d-7d1e980afa8e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	CURR-BUD-M1	หลักสูตรพุทธศาสน์ศึกษาและภาษาบาลี (มคอ. 2)	JUNIOR_HIGH	88	หลักสูตรมาตรฐาน มคอ. 2 บูรณาการคุณธรรม จริยธรรม หลักพุทธธรรม และภาษาบาลีเบื้องต้นเพื่อชีวิต	t	2026-09-12 02:47:31.476+07	2026-09-12 06:29:06+07	\N	d1000000-0000-0000-0000-000000000003	\N	2568	\N	มัธยมศึกษาตอนต้น	4	12	32	44	Buddhist Studies & Pali Language Curriculum	\N	\N	\N
6557890a-e0e3-47e5-a69b-9255127ff9c7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	CURR-SCI-M4	หลักสูตรวิทยาศาสตร์-คณิตศาสตร์ มัธยมศึกษาตอนปลาย	HIGH_SCHOOL	84	หลักสูตรเน้นกระบวนการคิดวิเคราะห์ การทดลองทางวิทยาศาสตร์ คณิตศาสตร์เข้มข้น และนวัตกรรมเทคโนโลยี	t	2026-09-12 02:47:31.348+07	2026-09-12 06:29:05.981+07	\N	d1000000-0000-0000-0000-000000000001	\N	2568	\N	มัธยมศึกษาตอนปลาย	4	12	30	42	Science-Mathematics Curriculum (Senior High School)	\N	\N	\N
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, tenant_id, parent_id, name, created_at, updated_at, code, description) FROM stdin;
d1000000-0000-0000-0000-000000000001	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี	2026-09-12 02:36:08.001+07	2026-09-12 06:29:05.97+07	SCI-MATH	จัดการเรียนการสอนวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยีสารสนเทศ
d1000000-0000-0000-0000-000000000002	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	กลุ่มสาระการเรียนรู้ภาษาไทยและภาษาต่างประเทศ	2026-09-12 02:36:08.173+07	2026-09-12 06:29:05.974+07	LANG	จัดการเรียนการสอนภาษาไทย ภาษาอังกฤษ และภาษาต่างประเทศเสริม
d1000000-0000-0000-0000-000000000003	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2026-09-12 02:36:08.18+07	2026-09-12 06:29:05.978+07	SOC-BUD	จัดการเรียนการสอนสังคมศึกษา ประวัติศาสตร์ พระพุทธศาสนา และภาษาบาลี
\.


--
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.documents (id, tenant_id, requester_id, doc_no, title, doc_type, file_url, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, tenant_id, user_id, department_id, employee_code, first_name, last_name, "position", contact_info, is_active, created_at, updated_at, image_url) FROM stdin;
eefbac9c-0f0d-4f00-8883-c4ba4d5bfac0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	d1000000-0000-0000-0000-000000000003	EMP-001	สมศักดิ์	ปัญญาดี	ผู้อำนวยการโรงเรียนสาธิต มจร	\N	t	2026-09-12 06:29:06.012+07	2026-09-12 06:29:06.012+07	\N
e8d6991f-a7f2-44a4-b51e-d6d8f0f53eb8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	d1000000-0000-0000-0000-000000000001	EMP-002	วิภาดา	รัตนโกสินทร์	หัวหน้ากลุ่มสาระวิทยาศาสตร์และเทคโนโลยี	\N	t	2026-09-12 06:29:06.018+07	2026-09-12 06:29:06.018+07	\N
3d87f61a-934e-4898-9ef7-1c052e2ec5ce	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	d1000000-0000-0000-0000-000000000003	EMP-003	พระมหาบุญเลิศ	เขมธโร	หัวหน้ากลุ่มสาระสังคมศึกษาและภาษาบาลี	\N	t	2026-09-12 06:29:06.022+07	2026-09-12 06:29:06.022+07	\N
\.


--
-- Data for Name: facilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facilities (id, tenant_id, type, name, capacity, status, created_at, updated_at, image_url) FROM stdin;
\.


--
-- Data for Name: login_throttles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login_throttles (key, fail_count, locked_until, updated_at) FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, code, module, action, description) FROM stdin;
80614086-1f16-4e18-bc91-e35ee867691e	users:read	users	read	\N
f4bbce42-ff0d-45c8-96d7-aabfc71e155c	users:manage	users	manage	\N
0d69ce67-d991-492a-bd23-2dee488d97a3	roles:manage	roles	manage	\N
8ddf2bf7-11bd-4445-9f5c-4febcd02480c	settings:manage	settings	manage	\N
5bb9cabe-bf67-4629-a6f5-f054844939de	audit:read	audit	read	\N
1dceb1f4-e0aa-49a9-9063-e04b633d248e	sample:read	sample	read	\N
d1fb0735-7ce8-4391-b98d-a498deff26f9	sample:manage	sample	manage	\N
db231d7a-eec7-4418-9a1c-39d23873a49c	news:read	news	read	อ่านข่าวสาร
3b03638d-3dcf-412f-b2ca-edeeb6dbbcd6	news:manage	news	manage	จัดการข่าวสาร (เพิ่ม/ลบ/แก้ไข)
5392801f-6178-4058-9115-e8976f70a5b3	personnel.read	personnel	read	Read personnel
75132f59-9527-4343-823a-4de34718a821	personnel.manage	personnel	manage	Manage personnel
8e3f5f44-76dc-46a7-8d52-314786e4fe38	curriculum:read	curriculum	read	Read curriculum
ea98577a-4e1c-42e5-994c-0f5e451927a8	curriculum:manage	curriculum	manage	Manage curriculum
f3f2729e-2e81-494c-856b-d41bdf077068	department:read	department	read	ดูข้อมูลภาควิชาและส่วนงาน
f574f113-7949-47ae-afe0-f424568c1a82	department:manage	department	manage	จัดการภาควิชาและส่วนงาน
5decd2d3-06c3-4136-a2bf-4d7e2f08135b	DOCUMENT_READ	document	read	Read document
c5372d79-e861-4ae5-bef4-6578a518f99a	DOCUMENT_MANAGE	document	manage	Manage document
d5fa103e-3716-4fd2-bcb7-f980f057ca00	facility.read	facility	read	Read facility
7c390088-1c40-45eb-a603-1b54518b4835	facility.manage	facility	manage	Manage facility
\.


--
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservations (id, tenant_id, facility_id, user_id, title, start_time, end_time, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permissions (role_id, permission_id) FROM stdin;
7908a9e6-f125-4f91-b268-d778d6e0228e	80614086-1f16-4e18-bc91-e35ee867691e
7908a9e6-f125-4f91-b268-d778d6e0228e	f4bbce42-ff0d-45c8-96d7-aabfc71e155c
7908a9e6-f125-4f91-b268-d778d6e0228e	0d69ce67-d991-492a-bd23-2dee488d97a3
7908a9e6-f125-4f91-b268-d778d6e0228e	8ddf2bf7-11bd-4445-9f5c-4febcd02480c
7908a9e6-f125-4f91-b268-d778d6e0228e	5bb9cabe-bf67-4629-a6f5-f054844939de
ebd7540d-85a6-4c76-8669-70548b089a9a	80614086-1f16-4e18-bc91-e35ee867691e
f38b3726-0965-45a9-be72-ad64d45f3d84	80614086-1f16-4e18-bc91-e35ee867691e
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, tenant_id, code, name_th, name_en, description, is_system, created_at, updated_at) FROM stdin;
1239ae04-41ee-458e-a62c-c9f58d054471	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	SUPER_ADMIN	ผู้ดูแลสูงสุด	Super admin	\N	t	2026-09-11 03:08:14.878+07	2026-09-12 06:29:05.429+07
7908a9e6-f125-4f91-b268-d778d6e0228e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ADMIN	ผู้ดูแลระบบ	Administrator	\N	f	2026-09-11 03:08:14.882+07	2026-09-12 06:29:05.433+07
ebd7540d-85a6-4c76-8669-70548b089a9a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STAFF	เจ้าหน้าที่	Staff	\N	f	2026-09-11 03:08:14.911+07	2026-09-12 06:29:05.461+07
f38b3726-0965-45a9-be72-ad64d45f3d84	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	VIEWER	ผู้ดู	Viewer	\N	f	2026-09-11 03:08:14.919+07	2026-09-12 06:29:05.469+07
\.


--
-- Data for Name: sample_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sample_items (id, tenant_id, title, description, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tenants (id, code, name_th, name_en, logo_url, settings, is_active, created_at, updated_at) FROM stdin;
f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	DEMO	โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย	SATIT MCU	/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg	{"smtp": {"from": "นิโรจน์ วงศ์เมืองแก่น <hero2027@gmail.com>", "host": "smtp.gmail.com", "pass": "bqnm vzzy mpjg cmss", "port": 465, "user": "hero2027@gmail.com", "secure": true}, "palette": "blue"}	t	2026-09-11 03:08:14.731+07	2026-09-12 06:29:05.477+07
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (id, user_tenant_id, role_id, scope_type, scope_id, created_at) FROM stdin;
cdb42b82-c732-40e6-8f76-91901fd8c313	1b20d9b1-2ec9-4c26-a41c-580f8c04c351	1239ae04-41ee-458e-a62c-c9f58d054471	ALL	\N	2026-09-12 06:29:05.892+07
a4779226-6759-47f6-83e6-515d466b4c9c	93fd897b-6104-4d1d-8517-0d1483bb6012	ebd7540d-85a6-4c76-8669-70548b089a9a	ALL	\N	2026-09-12 06:29:05.934+07
2aa17365-c816-4308-99f9-81fc01ae2f35	7e89299c-ba7c-42a3-b6e2-1d723159b863	f38b3726-0965-45a9-be72-ad64d45f3d84	ALL	\N	2026-09-12 06:29:05.944+07
b1667a14-440c-4140-bbca-40da32cb26b6	a40a8c4a-0d66-40aa-8b9d-cd4b6c418b95	f38b3726-0965-45a9-be72-ad64d45f3d84	ALL	\N	2026-09-12 06:29:05.953+07
5d828793-a865-42bd-ad08-25c2eb01eafe	1dcbaee2-a971-45a6-a0bc-c03f21b479dd	f38b3726-0965-45a9-be72-ad64d45f3d84	ALL	\N	2026-09-12 06:29:05.962+07
c5ea32fc-b1f6-4b0b-8ef1-7bdea2130491	dd9f83fa-edd7-4c27-ae81-8dfe9effaf7f	ebd7540d-85a6-4c76-8669-70548b089a9a	ALL	\N	2026-09-12 07:21:20.4+07
5815501b-a50d-4a4f-abb5-3fa2ac673d4c	867e50af-caa0-43c2-8ee8-95987afb5ed0	f38b3726-0965-45a9-be72-ad64d45f3d84	ALL	\N	2026-09-12 07:21:20.85+07
841f49a5-092f-4c5a-9a0f-66fcb529155c	46959b0e-b7df-4aeb-afae-eb1a235a0b87	1239ae04-41ee-458e-a62c-c9f58d054471	ALL	\N	2026-09-12 07:21:21.336+07
ca6590e5-e55b-4e64-8ff2-7716a21f8a1d	b711b76b-0228-4bf8-99f9-c501dd927c79	1239ae04-41ee-458e-a62c-c9f58d054471	ALL	\N	2026-09-12 07:21:21.821+07
fec5018f-765f-423e-9db8-3d5d77e8d89f	b95caba8-8260-40e4-8b01-91cbf26e84b4	ebd7540d-85a6-4c76-8669-70548b089a9a	ALL	\N	2026-09-12 07:21:22.316+07
\.


--
-- Data for Name: user_tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_tenants (id, user_id, tenant_id, is_active, joined_at) FROM stdin;
1b20d9b1-2ec9-4c26-a41c-580f8c04c351	e665ca42-7399-4354-bb6b-f9b75deb9829	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-09-11 03:08:15.401+07
93fd897b-6104-4d1d-8517-0d1483bb6012	d4af3c39-9cd8-4db8-9eae-81896f979d24	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-09-11 03:08:15.419+07
7e89299c-ba7c-42a3-b6e2-1d723159b863	12c57d95-e477-4b06-8bea-4ded5ff977b8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-09-11 03:08:15.43+07
a40a8c4a-0d66-40aa-8b9d-cd4b6c418b95	b01e1fd7-3453-4258-b69e-df3ae3dfd969	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-09-11 03:08:15.44+07
1dcbaee2-a971-45a6-a0bc-c03f21b479dd	e6e81291-4275-423e-9825-ef10dd12949e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-09-11 03:08:15.45+07
dd9f83fa-edd7-4c27-ae81-8dfe9effaf7f	e56ff9bd-eee2-46f7-9969-b822fe0cbe7a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-09-12 07:21:20.391+07
867e50af-caa0-43c2-8ee8-95987afb5ed0	f83eae06-3b6c-47a4-ad26-4a6350d2f22a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-09-12 07:21:20.846+07
46959b0e-b7df-4aeb-afae-eb1a235a0b87	b9b589e5-8938-478b-a419-9e32a492b658	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-09-12 07:21:21.334+07
b711b76b-0228-4bf8-99f9-c501dd927c79	19ff7a93-fc4c-4265-8ecb-e75d0e9b1a6f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-09-12 07:21:21.819+07
b95caba8-8260-40e4-8b01-91cbf26e84b4	e6631061-fa77-4f80-ba43-e35cf6e918e7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-09-12 07:21:22.312+07
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password_hash, name, image_url, provider, provider_id, email_verified, is_active, must_change_password, locale, last_login_at, created_at, updated_at) FROM stdin;
d4af3c39-9cd8-4db8-9eae-81896f979d24	staff@app.local	$2b$12$JvCtZTYa583tFb97mNUv8Oqlfgg4M8.8z1LsnaeLiuNP9eu2.Udre	เจ้าหน้าที่ฝ่ายวิชาการ	\N	credentials	\N	t	t	f	\N	\N	2026-09-11 03:08:15.417+07	2026-09-12 06:29:05.927+07
12c57d95-e477-4b06-8bea-4ded5ff977b8	viewer@app.local	$2b$12$JvCtZTYa583tFb97mNUv8Oqlfgg4M8.8z1LsnaeLiuNP9eu2.Udre	อาจารย์ผู้สอน	\N	credentials	\N	t	t	f	\N	\N	2026-09-11 03:08:15.426+07	2026-09-12 06:29:05.937+07
b01e1fd7-3453-4258-b69e-df3ae3dfd969	lockme@app.local	$2b$12$JvCtZTYa583tFb97mNUv8Oqlfgg4M8.8z1LsnaeLiuNP9eu2.Udre	บัญชีทดสอบล็อก	\N	credentials	\N	t	t	f	\N	\N	2026-09-11 03:08:15.437+07	2026-09-12 06:29:05.947+07
e6e81291-4275-423e-9825-ef10dd12949e	forced@app.local	$2b$12$JvCtZTYa583tFb97mNUv8Oqlfgg4M8.8z1LsnaeLiuNP9eu2.Udre	บัญชีบังคับเปลี่ยนรหัส	\N	credentials	\N	t	t	t	\N	\N	2026-09-11 03:08:15.447+07	2026-09-12 06:29:05.956+07
e665ca42-7399-4354-bb6b-f9b75deb9829	admin@app.local	$2b$12$JvCtZTYa583tFb97mNUv8Oqlfgg4M8.8z1LsnaeLiuNP9eu2.Udre	ผู้ดูแลสูงสุด (Admin)	\N	credentials	\N	t	t	f	th	2026-09-12 06:53:36.517+07	2026-09-11 03:08:15.394+07	2026-09-12 06:53:36.519+07
e56ff9bd-eee2-46f7-9969-b822fe0cbe7a	somchai@satit.mcu.ac.th	$2b$12$JPQ8.OAKPF34IkMV9Q/LpuAlppqcqX60R2f97UKi8Y3ugoeCjbPKq	สมชาย ใจดี	\N	credentials	\N	f	t	f	\N	\N	2026-09-12 07:21:20.387+07	2026-09-12 07:21:20.387+07
f83eae06-3b6c-47a4-ad26-4a6350d2f22a	somsri@satit.mcu.ac.th	$2b$12$X35EajqrkzP3JXa4RaHs3utWumtuKvY0W849ygghmOtjCNp/Nkwpi	สมศรี รักเรียน	\N	credentials	\N	f	t	f	\N	\N	2026-09-12 07:21:20.843+07	2026-09-12 07:21:20.843+07
b9b589e5-8938-478b-a419-9e32a492b658	raysfksjfk@gmail.com	$2b$12$6wHlI2qmvY0OR081EY.Lq.Hc.vLY.ye3K5lnDKnpJPBWltDCx5DU2	อาจารย์อรรถพล จอมมงคล	\N	credentials	\N	f	t	f	\N	\N	2026-09-12 07:21:21.329+07	2026-09-12 07:21:21.329+07
19ff7a93-fc4c-4265-8ecb-e75d0e9b1a6f	raysf5jfk@gmail.com	$2b$12$xDmcOQ5PLlnBFXeKtYt.Be9E/4KGW0rPun7vca3Z.NBHqJzUxD9D.	อาจารย์นิโรจน์ วงศ์เมืองแก่น	\N	credentials	\N	f	t	f	\N	\N	2026-09-12 07:21:21.817+07	2026-09-12 07:21:21.817+07
e6631061-fa77-4f80-ba43-e35cf6e918e7	raysf5t53tksjfk@gmail.com	$2b$12$JOMeTa8prxKL3K4uzucsbeg6g4gX9QvXhIF1Wn.keu7j1bHXNOeo.	พระมหาศุภชัย สุญาโณ	\N	credentials	\N	f	t	f	\N	\N	2026-09-12 07:21:22.308+07	2026-09-12 07:21:22.308+07
\.


--
-- Name: approval_steps approval_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_steps
    ADD CONSTRAINT approval_steps_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: auth_tokens auth_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_tokens
    ADD CONSTRAINT auth_tokens_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: curriculums curriculums_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.curriculums
    ADD CONSTRAINT curriculums_pkey PRIMARY KEY (id);


--
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: facilities facilities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT facilities_pkey PRIMARY KEY (id);


--
-- Name: login_throttles login_throttles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_throttles
    ADD CONSTRAINT login_throttles_pkey PRIMARY KEY (key);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- Name: role_permissions role_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sample_items sample_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sample_items
    ADD CONSTRAINT sample_items_pkey PRIMARY KEY (id);


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_tenants user_tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tenants
    ADD CONSTRAINT user_tenants_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: approval_steps_document_id_step_order_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX approval_steps_document_id_step_order_key ON public.approval_steps USING btree (document_id, step_order);


--
-- Name: articles_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX articles_tenant_id_idx ON public.articles USING btree (tenant_id);


--
-- Name: audit_logs_tenant_id_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_tenant_id_created_at_idx ON public.audit_logs USING btree (tenant_id, created_at);


--
-- Name: audit_logs_tenant_id_entity_entity_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_logs_tenant_id_entity_entity_id_idx ON public.audit_logs USING btree (tenant_id, entity, entity_id);


--
-- Name: auth_tokens_token_hash_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX auth_tokens_token_hash_key ON public.auth_tokens USING btree (token_hash);


--
-- Name: auth_tokens_user_id_purpose_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_tokens_user_id_purpose_idx ON public.auth_tokens USING btree (user_id, purpose);


--
-- Name: categories_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_tenant_id_idx ON public.categories USING btree (tenant_id);


--
-- Name: categories_tenant_id_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX categories_tenant_id_slug_key ON public.categories USING btree (tenant_id, slug);


--
-- Name: courses_curriculum_id_course_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX courses_curriculum_id_course_code_key ON public.courses USING btree (curriculum_id, course_code);


--
-- Name: curriculums_department_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX curriculums_department_id_idx ON public.curriculums USING btree (department_id);


--
-- Name: curriculums_tenant_id_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX curriculums_tenant_id_code_key ON public.curriculums USING btree (tenant_id, code);


--
-- Name: curriculums_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX curriculums_tenant_id_idx ON public.curriculums USING btree (tenant_id);


--
-- Name: departments_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX departments_parent_id_idx ON public.departments USING btree (parent_id);


--
-- Name: departments_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX departments_tenant_id_idx ON public.departments USING btree (tenant_id);


--
-- Name: documents_tenant_id_doc_no_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX documents_tenant_id_doc_no_key ON public.documents USING btree (tenant_id, doc_no);


--
-- Name: documents_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX documents_tenant_id_idx ON public.documents USING btree (tenant_id);


--
-- Name: employees_tenant_id_employee_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX employees_tenant_id_employee_code_key ON public.employees USING btree (tenant_id, employee_code);


--
-- Name: employees_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX employees_tenant_id_idx ON public.employees USING btree (tenant_id);


--
-- Name: facilities_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX facilities_tenant_id_idx ON public.facilities USING btree (tenant_id);


--
-- Name: permissions_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX permissions_code_key ON public.permissions USING btree (code);


--
-- Name: reservations_facility_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reservations_facility_id_idx ON public.reservations USING btree (facility_id);


--
-- Name: reservations_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reservations_tenant_id_idx ON public.reservations USING btree (tenant_id);


--
-- Name: roles_tenant_id_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX roles_tenant_id_code_key ON public.roles USING btree (tenant_id, code);


--
-- Name: sample_items_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sample_items_tenant_id_idx ON public.sample_items USING btree (tenant_id);


--
-- Name: tenants_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tenants_code_key ON public.tenants USING btree (code);


--
-- Name: user_roles_role_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_roles_role_id_idx ON public.user_roles USING btree (role_id);


--
-- Name: user_roles_user_tenant_id_role_id_scope_type_scope_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_roles_user_tenant_id_role_id_scope_type_scope_id_key ON public.user_roles USING btree (user_tenant_id, role_id, scope_type, scope_id);


--
-- Name: user_tenants_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_tenants_tenant_id_idx ON public.user_tenants USING btree (tenant_id);


--
-- Name: user_tenants_user_id_tenant_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_tenants_user_id_tenant_id_key ON public.user_tenants USING btree (user_id, tenant_id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: approval_steps approval_steps_approver_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_steps
    ADD CONSTRAINT approval_steps_approver_role_id_fkey FOREIGN KEY (approver_role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: approval_steps approval_steps_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_steps
    ADD CONSTRAINT approval_steps_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: articles articles_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: articles articles_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: articles articles_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: audit_logs audit_logs_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: audit_logs audit_logs_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: auth_tokens auth_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_tokens
    ADD CONSTRAINT auth_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: categories categories_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: courses courses_curriculum_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_curriculum_id_fkey FOREIGN KEY (curriculum_id) REFERENCES public.curriculums(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: curriculums curriculums_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.curriculums
    ADD CONSTRAINT curriculums_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: curriculums curriculums_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.curriculums
    ADD CONSTRAINT curriculums_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: departments departments_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.departments(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: departments departments_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: documents documents_requester_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_requester_id_fkey FOREIGN KEY (requester_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: documents documents_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employees employees_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: employees employees_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employees employees_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: facilities facilities_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT facilities_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reservations reservations_facility_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES public.facilities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reservations reservations_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reservations reservations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: role_permissions role_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: roles roles_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sample_items sample_items_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sample_items
    ADD CONSTRAINT sample_items_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_roles user_roles_user_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_tenant_id_fkey FOREIGN KEY (user_tenant_id) REFERENCES public.user_tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_tenants user_tenants_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tenants
    ADD CONSTRAINT user_tenants_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_tenants user_tenants_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tenants
    ADD CONSTRAINT user_tenants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict t1VjGl69UIL7xo4fknDcwI89gSpFRqj7QQ6RCuscAUrP2gX31BQoG4Lh7uui2Ps

