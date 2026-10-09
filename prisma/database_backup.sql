--
-- PostgreSQL database dump
--

\restrict aD7fH30R37iZiThZb6Hyrq6owZJfNM8Ps1XQaEc8JC71jZ1xrb1qVeYBLOu4khf

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
ALTER TABLE IF EXISTS ONLY public.students DROP CONSTRAINT IF EXISTS students_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.sample_items DROP CONSTRAINT IF EXISTS sample_items_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.role_permissions DROP CONSTRAINT IF EXISTS role_permissions_role_id_fkey;
ALTER TABLE IF EXISTS ONLY public.role_permissions DROP CONSTRAINT IF EXISTS role_permissions_permission_id_fkey;
ALTER TABLE IF EXISTS ONLY public.reservations DROP CONSTRAINT IF EXISTS reservations_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.reservations DROP CONSTRAINT IF EXISTS reservations_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.reservations DROP CONSTRAINT IF EXISTS reservations_facility_id_fkey;
ALTER TABLE IF EXISTS ONLY public.grade_records DROP CONSTRAINT IF EXISTS grade_records_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.grade_records DROP CONSTRAINT IF EXISTS grade_records_student_id_fkey;
ALTER TABLE IF EXISTS ONLY public.grade_records DROP CONSTRAINT IF EXISTS grade_records_course_id_fkey;
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
ALTER TABLE IF EXISTS ONLY public.course_grading_schemes DROP CONSTRAINT IF EXISTS course_grading_schemes_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.course_grading_schemes DROP CONSTRAINT IF EXISTS course_grading_schemes_course_id_fkey;
ALTER TABLE IF EXISTS ONLY public.course_enrollments DROP CONSTRAINT IF EXISTS course_enrollments_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.course_enrollments DROP CONSTRAINT IF EXISTS course_enrollments_student_id_fkey;
ALTER TABLE IF EXISTS ONLY public.course_enrollments DROP CONSTRAINT IF EXISTS course_enrollments_course_id_fkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.auth_tokens DROP CONSTRAINT IF EXISTS auth_tokens_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_actor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.attendances DROP CONSTRAINT IF EXISTS attendances_tenant_id_fkey;
ALTER TABLE IF EXISTS ONLY public.attendances DROP CONSTRAINT IF EXISTS attendances_student_id_fkey;
ALTER TABLE IF EXISTS ONLY public.attendances DROP CONSTRAINT IF EXISTS attendances_course_id_fkey;
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
DROP INDEX IF EXISTS public.students_tenant_id_student_code_key;
DROP INDEX IF EXISTS public.students_tenant_id_idx;
DROP INDEX IF EXISTS public.students_class_room_idx;
DROP INDEX IF EXISTS public.sample_items_tenant_id_idx;
DROP INDEX IF EXISTS public.roles_tenant_id_code_key;
DROP INDEX IF EXISTS public.reservations_tenant_id_idx;
DROP INDEX IF EXISTS public.reservations_facility_id_idx;
DROP INDEX IF EXISTS public.permissions_code_key;
DROP INDEX IF EXISTS public.grade_records_tenant_id_idx;
DROP INDEX IF EXISTS public.grade_records_student_id_idx;
DROP INDEX IF EXISTS public.grade_records_student_id_course_id_academic_year_semester_key;
DROP INDEX IF EXISTS public.grade_records_course_id_idx;
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
DROP INDEX IF EXISTS public.course_grading_schemes_tenant_id_idx;
DROP INDEX IF EXISTS public.course_grading_schemes_course_id_idx;
DROP INDEX IF EXISTS public.course_grading_schemes_course_id_class_room_academic_year_s_key;
DROP INDEX IF EXISTS public.course_enrollments_tenant_id_idx;
DROP INDEX IF EXISTS public.course_enrollments_student_id_course_id_academic_year_semes_key;
DROP INDEX IF EXISTS public.course_enrollments_course_id_idx;
DROP INDEX IF EXISTS public.categories_tenant_id_slug_key;
DROP INDEX IF EXISTS public.categories_tenant_id_idx;
DROP INDEX IF EXISTS public.auth_tokens_user_id_purpose_idx;
DROP INDEX IF EXISTS public.auth_tokens_token_hash_key;
DROP INDEX IF EXISTS public.audit_logs_tenant_id_entity_entity_id_idx;
DROP INDEX IF EXISTS public.audit_logs_tenant_id_created_at_idx;
DROP INDEX IF EXISTS public.attendances_tenant_id_idx;
DROP INDEX IF EXISTS public.attendances_student_id_idx;
DROP INDEX IF EXISTS public.attendances_student_id_course_id_class_date_period_key;
DROP INDEX IF EXISTS public.attendances_class_date_idx;
DROP INDEX IF EXISTS public.articles_tenant_id_idx;
DROP INDEX IF EXISTS public.approval_steps_document_id_step_order_key;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.user_tenants DROP CONSTRAINT IF EXISTS user_tenants_pkey;
ALTER TABLE IF EXISTS ONLY public.user_roles DROP CONSTRAINT IF EXISTS user_roles_pkey;
ALTER TABLE IF EXISTS ONLY public.tenants DROP CONSTRAINT IF EXISTS tenants_pkey;
ALTER TABLE IF EXISTS ONLY public.students DROP CONSTRAINT IF EXISTS students_pkey;
ALTER TABLE IF EXISTS ONLY public.sample_items DROP CONSTRAINT IF EXISTS sample_items_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_pkey;
ALTER TABLE IF EXISTS ONLY public.role_permissions DROP CONSTRAINT IF EXISTS role_permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.reservations DROP CONSTRAINT IF EXISTS reservations_pkey;
ALTER TABLE IF EXISTS ONLY public.permissions DROP CONSTRAINT IF EXISTS permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.login_throttles DROP CONSTRAINT IF EXISTS login_throttles_pkey;
ALTER TABLE IF EXISTS ONLY public.grade_records DROP CONSTRAINT IF EXISTS grade_records_pkey;
ALTER TABLE IF EXISTS ONLY public.facilities DROP CONSTRAINT IF EXISTS facilities_pkey;
ALTER TABLE IF EXISTS ONLY public.employees DROP CONSTRAINT IF EXISTS employees_pkey;
ALTER TABLE IF EXISTS ONLY public.documents DROP CONSTRAINT IF EXISTS documents_pkey;
ALTER TABLE IF EXISTS ONLY public.departments DROP CONSTRAINT IF EXISTS departments_pkey;
ALTER TABLE IF EXISTS ONLY public.curriculums DROP CONSTRAINT IF EXISTS curriculums_pkey;
ALTER TABLE IF EXISTS ONLY public.courses DROP CONSTRAINT IF EXISTS courses_pkey;
ALTER TABLE IF EXISTS ONLY public.course_grading_schemes DROP CONSTRAINT IF EXISTS course_grading_schemes_pkey;
ALTER TABLE IF EXISTS ONLY public.course_enrollments DROP CONSTRAINT IF EXISTS course_enrollments_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_tokens DROP CONSTRAINT IF EXISTS auth_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_pkey;
ALTER TABLE IF EXISTS ONLY public.attendances DROP CONSTRAINT IF EXISTS attendances_pkey;
ALTER TABLE IF EXISTS ONLY public.articles DROP CONSTRAINT IF EXISTS articles_pkey;
ALTER TABLE IF EXISTS ONLY public.approval_steps DROP CONSTRAINT IF EXISTS approval_steps_pkey;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.user_tenants;
DROP TABLE IF EXISTS public.user_roles;
DROP TABLE IF EXISTS public.tenants;
DROP TABLE IF EXISTS public.students;
DROP TABLE IF EXISTS public.sample_items;
DROP TABLE IF EXISTS public.roles;
DROP TABLE IF EXISTS public.role_permissions;
DROP TABLE IF EXISTS public.reservations;
DROP TABLE IF EXISTS public.permissions;
DROP TABLE IF EXISTS public.login_throttles;
DROP TABLE IF EXISTS public.grade_records;
DROP TABLE IF EXISTS public.facilities;
DROP TABLE IF EXISTS public.employees;
DROP TABLE IF EXISTS public.documents;
DROP TABLE IF EXISTS public.departments;
DROP TABLE IF EXISTS public.curriculums;
DROP TABLE IF EXISTS public.courses;
DROP TABLE IF EXISTS public.course_grading_schemes;
DROP TABLE IF EXISTS public.course_enrollments;
DROP TABLE IF EXISTS public.categories;
DROP TABLE IF EXISTS public.auth_tokens;
DROP TABLE IF EXISTS public.audit_logs;
DROP TABLE IF EXISTS public.attendances;
DROP TABLE IF EXISTS public.articles;
DROP TABLE IF EXISTS public.approval_steps;
DROP TYPE IF EXISTS public."TokenPurpose";
DROP TYPE IF EXISTS public."ScopeType";
DROP TYPE IF EXISTS public."ReservationStatus";
DROP TYPE IF EXISTS public."FacilityType";
DROP TYPE IF EXISTS public."FacilityStatus";
DROP TYPE IF EXISTS public."DocStatus";
DROP TYPE IF EXISTS public."CourseType";
DROP TYPE IF EXISTS public."AttendanceStatus";
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
-- Name: AttendanceStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AttendanceStatus" AS ENUM (
    'PRESENT',
    'ABSENT',
    'LEAVE',
    'LATE'
);


ALTER TYPE public."AttendanceStatus" OWNER TO postgres;

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
-- Name: attendances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendances (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    student_id uuid NOT NULL,
    course_id uuid,
    class_date date NOT NULL,
    period integer DEFAULT 1 NOT NULL,
    status public."AttendanceStatus" DEFAULT 'PRESENT'::public."AttendanceStatus" NOT NULL,
    remarks character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.attendances OWNER TO postgres;

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
-- Name: course_enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_enrollments (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    student_id uuid NOT NULL,
    course_id uuid NOT NULL,
    academic_year character varying(10) DEFAULT '2569'::character varying NOT NULL,
    semester integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.course_enrollments OWNER TO postgres;

--
-- Name: course_grading_schemes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_grading_schemes (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    course_id uuid NOT NULL,
    class_room character varying(50) NOT NULL,
    academic_year character varying(10) DEFAULT '2569'::character varying NOT NULL,
    semester integer DEFAULT 1 NOT NULL,
    max_assignment double precision DEFAULT 30 NOT NULL,
    max_midterm double precision DEFAULT 20 NOT NULL,
    max_behavior double precision DEFAULT 20 NOT NULL,
    max_final double precision DEFAULT 30 NOT NULL,
    min_attendance_percent double precision DEFAULT 80 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.course_grading_schemes OWNER TO postgres;

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
-- Name: grade_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grade_records (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    student_id uuid NOT NULL,
    course_id uuid NOT NULL,
    academic_year character varying(10) DEFAULT '2569'::character varying NOT NULL,
    semester integer DEFAULT 1 NOT NULL,
    assignment_score double precision DEFAULT 0 NOT NULL,
    midterm_score double precision DEFAULT 0 NOT NULL,
    behavior_score double precision DEFAULT 0 NOT NULL,
    final_score double precision DEFAULT 0 NOT NULL,
    total_score double precision DEFAULT 0 NOT NULL,
    grade character varying(10) DEFAULT '0'::character varying NOT NULL,
    is_passing boolean DEFAULT true NOT NULL,
    remarks character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.grade_records OWNER TO postgres;

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
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    student_code character varying(50) NOT NULL,
    title character varying(20) DEFAULT 'ด.ช.'::character varying NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    class_room character varying(50) NOT NULL,
    seat_no integer NOT NULL,
    gender character varying(10),
    status character varying(20) DEFAULT 'ACTIVE'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.students OWNER TO postgres;

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
-- Data for Name: attendances; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendances (id, tenant_id, student_id, course_id, class_date, period, status, remarks, created_at, updated_at) FROM stdin;
66bd35a7-9c0a-4e95-8abe-5f7ae5f2511d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.054+07	2026-10-09 12:01:58.054+07
1c4ece47-0538-4b9f-b032-119d4de154b4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.068+07	2026-10-09 12:01:58.068+07
e3811c17-7d96-48d7-aca2-4582cd56b32e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.073+07	2026-10-09 12:01:58.073+07
3b30cd2c-5891-4071-9c2c-b12757d52546	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	4bc941bd-088e-45d2-b574-60c76764e1f0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.077+07	2026-10-09 12:01:58.077+07
1423c97e-4757-44f7-99b0-672ac58723b9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	9ce3e0d1-ecfb-4434-9088-62f8d673d937	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.081+07	2026-10-09 12:01:58.081+07
7f5d78b1-c458-46a9-b6a2-2c9666a35d94	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.086+07	2026-10-09 12:01:58.086+07
9e35be29-4557-467b-85c8-a98644809407	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.09+07	2026-10-09 12:01:58.09+07
f7fce96e-aae5-4fd0-8412-2378168fa4f7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.095+07	2026-10-09 12:01:58.095+07
c08e8594-9874-4bf5-9c70-3f766faf0654	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.1+07	2026-10-09 12:01:58.1+07
e6795a47-8fd2-43fa-8b65-8b52a0c900dd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.104+07	2026-10-09 12:01:58.104+07
bbf444f3-8c03-4fb3-9272-4bdddfc0184a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.108+07	2026-10-09 12:01:58.108+07
f8054e85-a4e3-4c21-a236-ebc201fd5843	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.112+07	2026-10-09 12:01:58.112+07
70f9819a-8e04-4468-b646-9995b762ae69	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.115+07	2026-10-09 12:01:58.115+07
9fe42889-37a1-4982-bb90-70c41b67438b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	4bc941bd-088e-45d2-b574-60c76764e1f0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.119+07	2026-10-09 12:01:58.119+07
7caebe3c-0f52-4653-8d47-8385bc6fa34b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	9ce3e0d1-ecfb-4434-9088-62f8d673d937	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.123+07	2026-10-09 12:01:58.123+07
5ca68760-a634-4c08-94e8-7f085dfb0fa3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.126+07	2026-10-09 12:01:58.126+07
5670d6b9-19f3-492b-8024-f17ee602f2c3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.129+07	2026-10-09 12:01:58.129+07
71aa8786-1978-46ac-8bd1-ff8f1dfafa61	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.133+07	2026-10-09 12:01:58.133+07
9ea77316-51e7-4ada-a9a1-9099886b87c4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-21	1	LATE	\N	2026-10-09 12:01:58.136+07	2026-10-09 12:01:58.136+07
63700733-d148-4d2d-9410-4ceb3e4c207b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.139+07	2026-10-09 12:01:58.139+07
14a8c9b9-4034-49c7-a5cc-086de0effd7e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.143+07	2026-10-09 12:01:58.143+07
0f2ac5ec-17dc-4a33-bd68-cd02f7434c96	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.146+07	2026-10-09 12:01:58.146+07
9bfef093-485c-482b-9f9d-c778244aa450	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.15+07	2026-10-09 12:01:58.15+07
90c6c552-ca47-4736-8a8b-20f7f46deeae	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	4bc941bd-088e-45d2-b574-60c76764e1f0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.153+07	2026-10-09 12:01:58.153+07
91349f16-9a7b-430b-a7da-c5d596231973	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	9ce3e0d1-ecfb-4434-9088-62f8d673d937	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-24	1	ABSENT	\N	2026-10-09 12:01:58.156+07	2026-10-09 12:01:58.156+07
8dbdba2f-1980-4019-aa19-d8c79384078b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.159+07	2026-10-09 12:01:58.159+07
920294e2-f9b0-4533-8e7f-363aba8a7e2e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.163+07	2026-10-09 12:01:58.163+07
ce316055-238e-4bc0-b2aa-5c056a1784ac	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.166+07	2026-10-09 12:01:58.166+07
f4ce2970-63e5-4eab-988e-b0b30c1314a8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.169+07	2026-10-09 12:01:58.169+07
64450b38-8408-4eb2-b24d-0f431748698e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.172+07	2026-10-09 12:01:58.172+07
69f27729-b79b-4e79-a4ee-ade8aeb507b1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.176+07	2026-10-09 12:01:58.176+07
89cbab2c-e7cc-47dc-97cb-f6ddce43907e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-27	1	LATE	\N	2026-10-09 12:01:58.178+07	2026-10-09 12:01:58.178+07
d991a2b4-0ebb-4ec4-8c3e-4e6439f9d93a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.181+07	2026-10-09 12:01:58.181+07
187ff3c2-556a-498b-bc40-56723bb39791	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	4bc941bd-088e-45d2-b574-60c76764e1f0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.185+07	2026-10-09 12:01:58.185+07
15377c84-db19-4d5e-aa20-20517792c436	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	9ce3e0d1-ecfb-4434-9088-62f8d673d937	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.188+07	2026-10-09 12:01:58.188+07
cd8dfca4-fc37-4c67-9552-d704e9d41a9c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.191+07	2026-10-09 12:01:58.191+07
1ce36420-62f1-49c9-8931-d13ca6f4bd2b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.195+07	2026-10-09 12:01:58.195+07
b97daf45-1ac8-4d2f-8cc2-f34056abb2bf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.198+07	2026-10-09 12:01:58.198+07
250d4633-32fc-48b7-ba44-425397b1aaf0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.201+07	2026-10-09 12:01:58.201+07
9f5f34b6-e673-444f-b03d-75d7eb3f2f6a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.205+07	2026-10-09 12:01:58.205+07
c945b703-68a2-4fca-bb3e-34b4f0d8cd52	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.208+07	2026-10-09 12:01:58.208+07
2504411c-1f6a-48a3-846c-dbedcc04af7c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.211+07	2026-10-09 12:01:58.211+07
cbcd8595-e89d-44a4-b4c4-737d0e136478	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.215+07	2026-10-09 12:01:58.215+07
72ef325c-b6ea-4dc0-af6a-906dae2223fa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	4bc941bd-088e-45d2-b574-60c76764e1f0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.219+07	2026-10-09 12:01:58.219+07
f5775120-3d0a-467c-a305-ce41edf6e6c0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	9ce3e0d1-ecfb-4434-9088-62f8d673d937	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-30	1	ABSENT	\N	2026-10-09 12:01:58.222+07	2026-10-09 12:01:58.222+07
a37d1778-f59a-4108-b105-db0634f9fc77	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.225+07	2026-10-09 12:01:58.225+07
70633351-3e22-4651-a887-ebbd78168260	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.229+07	2026-10-09 12:01:58.229+07
418834b7-b80e-4801-b64e-b3abb1c782cc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-30	1	LEAVE	\N	2026-10-09 12:01:58.232+07	2026-10-09 12:01:58.232+07
270d19fd-3a2d-4810-92c8-274457a52f3a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.236+07	2026-10-09 12:01:58.236+07
15630c59-8f19-4a79-89f9-f3c1807ba157	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.239+07	2026-10-09 12:01:58.239+07
83701edc-da4a-4424-9d0c-4ce9aa61b78d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.242+07	2026-10-09 12:01:58.242+07
7f93fef3-2e93-4aaa-ab44-bb9978bafa6f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.245+07	2026-10-09 12:01:58.245+07
7bfc98f8-e712-4967-abe4-8d504c721e9b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-02	1	LEAVE	\N	2026-10-09 12:01:58.248+07	2026-10-09 12:01:58.248+07
3f4541ef-a617-4a61-a54a-89190981bd7c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	4bc941bd-088e-45d2-b574-60c76764e1f0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.251+07	2026-10-09 12:01:58.251+07
46d9816c-57a3-4a30-a097-d5bd852393de	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	9ce3e0d1-ecfb-4434-9088-62f8d673d937	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.255+07	2026-10-09 12:01:58.255+07
90a095a2-0f38-4a86-9bf2-f9836719c812	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.258+07	2026-10-09 12:01:58.258+07
8c95b40c-e92e-4f3a-beb1-060420236406	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.261+07	2026-10-09 12:01:58.261+07
32f1f9f8-f8f6-4528-953e-360082371e67	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.265+07	2026-10-09 12:01:58.265+07
ef6e2dac-b264-41ef-8173-859761cc0d72	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.268+07	2026-10-09 12:01:58.268+07
cfe662aa-88f7-4985-bb17-98c89696f36c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.271+07	2026-10-09 12:01:58.271+07
48a946d4-58d6-46f5-8ed2-d407e8a541c8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.275+07	2026-10-09 12:01:58.275+07
a3314fef-9865-472d-98d9-3b91fed83c1c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.278+07	2026-10-09 12:01:58.278+07
9edb9bb3-1fd4-4d2b-9843-bde6d55cc973	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.282+07	2026-10-09 12:01:58.282+07
14c74dc6-290f-45b2-b45b-eea7fe8d2b6e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	4bc941bd-088e-45d2-b574-60c76764e1f0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.287+07	2026-10-09 12:01:58.287+07
92ff30ad-3dd8-4441-b5b5-bc61ce06e978	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	9ce3e0d1-ecfb-4434-9088-62f8d673d937	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-05	1	ABSENT	\N	2026-10-09 12:01:58.29+07	2026-10-09 12:01:58.29+07
b86a029e-df50-4e43-8bf8-96454f5a5a54	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.293+07	2026-10-09 12:01:58.293+07
11385e3c-bf6e-4016-846d-178dde8f7cbe	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.296+07	2026-10-09 12:01:58.296+07
b63dd5c3-6764-4b1a-8aa6-301b991d368d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.299+07	2026-10-09 12:01:58.299+07
180a8af8-848e-414b-9dfb-3ddc0817b784	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.302+07	2026-10-09 12:01:58.302+07
c85da275-d240-4fb3-a202-e8d1fd4c7818	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.305+07	2026-10-09 12:01:58.305+07
ce813e53-69e5-4d14-bc3a-78c11eadb8de	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.308+07	2026-10-09 12:01:58.308+07
d76af95e-20dc-427d-8f32-036e0655b0d5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.312+07	2026-10-09 12:01:58.312+07
cec49123-22cb-4124-aa2a-465520c0f1bd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.315+07	2026-10-09 12:01:58.315+07
c71a4734-8acf-4f5a-98c9-9cb9c64fdc04	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	4bc941bd-088e-45d2-b574-60c76764e1f0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.318+07	2026-10-09 12:01:58.318+07
f1dae13c-6d08-4663-8238-97648d5cb18b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	9ce3e0d1-ecfb-4434-9088-62f8d673d937	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.321+07	2026-10-09 12:01:58.321+07
4ba91d2b-61e2-4c97-b198-67bd48dde9ec	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.325+07	2026-10-09 12:01:58.325+07
eb646f01-f14e-423b-9ea3-98b502c47315	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.328+07	2026-10-09 12:01:58.328+07
662883ed-4dd2-4caf-b86d-3e3c796a1b99	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.331+07	2026-10-09 12:01:58.331+07
f4f49bd7-8295-47d6-81e3-01d17176c052	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.334+07	2026-10-09 12:01:58.334+07
c317df22-8ca6-4d28-a76e-c666edd0ec06	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.338+07	2026-10-09 12:01:58.338+07
3b05b211-939c-4b7d-b000-117d61ebf74a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.341+07	2026-10-09 12:01:58.341+07
9893217d-04f3-4023-b68a-a67d9341b6ef	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.345+07	2026-10-09 12:01:58.345+07
ba1e892c-2ed2-4618-a8d7-4bae65b4a145	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.348+07	2026-10-09 12:01:58.348+07
68e41f17-c654-4dc2-bbe0-0df333d6c7d8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	4bc941bd-088e-45d2-b574-60c76764e1f0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.351+07	2026-10-09 12:01:58.351+07
e2b2e1c2-1e3f-49d8-89b2-db68e9514642	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	9ce3e0d1-ecfb-4434-9088-62f8d673d937	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-11	1	ABSENT	\N	2026-10-09 12:01:58.354+07	2026-10-09 12:01:58.354+07
eabc8ba8-5090-4e96-9e37-75b7f2c69f49	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.358+07	2026-10-09 12:01:58.358+07
9fd76244-6421-4f1e-b9d1-78d8ccfd0776	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.361+07	2026-10-09 12:01:58.361+07
1632b3b9-35d2-44ff-9c41-a1defb4e97ca	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.364+07	2026-10-09 12:01:58.364+07
4d652736-575b-476e-a068-40b8ec7cf88b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.368+07	2026-10-09 12:01:58.368+07
d03edab2-714d-4de3-ac2f-d6f8768b0907	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.372+07	2026-10-09 12:01:58.372+07
35ffc5ad-4c78-4c92-b131-a2364397924f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.376+07	2026-10-09 12:01:58.376+07
b4fe8986-8ac0-4ef4-91c1-caa3978f1349	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.379+07	2026-10-09 12:01:58.379+07
fd1fb1c1-a518-484c-94db-1e865bd9a3aa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.382+07	2026-10-09 12:01:58.382+07
738f0365-7c08-45d8-8229-ff80c8e407d9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	4bc941bd-088e-45d2-b574-60c76764e1f0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.386+07	2026-10-09 12:01:58.386+07
c57fe038-8138-4995-9a0a-a9879e18fe95	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	9ce3e0d1-ecfb-4434-9088-62f8d673d937	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.389+07	2026-10-09 12:01:58.389+07
a963b6f1-98f7-4598-8cf2-ab47e04087a1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.392+07	2026-10-09 12:01:58.392+07
9d1c515b-28a9-4087-b4f0-f2b24242629d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.395+07	2026-10-09 12:01:58.395+07
dfd797f5-7d2c-4ec2-b857-bd450904af08	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.398+07	2026-10-09 12:01:58.398+07
bf6b1a74-3918-4362-8ea5-2e218e4672be	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.402+07	2026-10-09 12:01:58.402+07
a15deef8-dca1-4ec2-a6cd-2e8b6ef0ef9c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	abcca187-88e4-4a6b-bb32-73e7eca1507f	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.406+07	2026-10-09 12:01:58.406+07
095c85bb-9487-44be-bfa8-f9906b34e402	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-09	1	PRESENT	\N	2026-10-09 12:15:47.004+07	2026-10-09 12:56:30.147+07
2a3ab258-10e9-4f77-98af-41e8a0908157	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-09	1	PRESENT	\N	2026-10-09 12:15:47.009+07	2026-10-09 12:56:30.152+07
09f6771e-5370-48a1-8ff2-ae509f49ce4d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-09	1	PRESENT	\N	2026-10-09 12:15:47.014+07	2026-10-09 12:56:30.157+07
f5df22ee-7b13-4bfd-909d-26d2cd4d0962	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	11d82bca-1a48-4db5-a348-be7e4f47d305	2026-10-09	2	ABSENT	\N	2026-10-09 12:22:57.151+07	2026-10-09 12:22:57.151+07
da5021be-6456-4556-90cf-0cbf42481372	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	11d82bca-1a48-4db5-a348-be7e4f47d305	2026-10-09	2	ABSENT	\N	2026-10-09 12:22:57.259+07	2026-10-09 12:22:57.259+07
9d0c3c3f-a822-4cd0-938d-c3b3a9743b28	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	11d82bca-1a48-4db5-a348-be7e4f47d305	2026-10-09	2	ABSENT	\N	2026-10-09 12:22:57.264+07	2026-10-09 12:22:57.264+07
472e5986-2703-425a-a053-8e96dc3e9515	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	4bc941bd-088e-45d2-b574-60c76764e1f0	11d82bca-1a48-4db5-a348-be7e4f47d305	2026-10-09	2	PRESENT	\N	2026-10-09 12:22:57.268+07	2026-10-09 12:22:57.268+07
a4f18fe8-db07-4c4f-bb6f-6c217f5e2936	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	9ce3e0d1-ecfb-4434-9088-62f8d673d937	11d82bca-1a48-4db5-a348-be7e4f47d305	2026-10-09	2	PRESENT	\N	2026-10-09 12:22:57.272+07	2026-10-09 12:22:57.272+07
1b783be7-36b4-4f0c-882e-2f8dc2e03e14	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-09	1	ABSENT	\N	2026-10-09 12:15:46.875+07	2026-10-09 12:56:29.902+07
867957d2-d428-419a-8f6f-005d98b661a5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-09	1	PRESENT	\N	2026-10-09 12:15:46.997+07	2026-10-09 12:56:30.143+07
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
-- Data for Name: course_enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_enrollments (id, tenant_id, student_id, course_id, academic_year, semester, created_at) FROM stdin;
\.


--
-- Data for Name: course_grading_schemes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_grading_schemes (id, tenant_id, course_id, class_room, academic_year, semester, max_assignment, max_midterm, max_behavior, max_final, min_attendance_percent, created_at, updated_at) FROM stdin;
b298efba-fbda-44d1-8555-688b9f5f4ae4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f24e501d-04de-4f98-b5e4-5b3e617e31da	ม.1/1	2569	1	50	10	20	20	80	2026-10-09 12:53:35.103+07	2026-10-09 12:53:35.103+07
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, curriculum_id, course_code, name, credits, semester, course_type, created_at, updated_at) FROM stdin;
6c7a7261-4c54-461a-8d41-ac03411f930e	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ท21101	ภาษาไทยพื้นฐาน 1 (ม.1)	1	1	CORE	2026-10-09 12:01:57.95+07	2026-10-09 12:01:57.95+07
f24e501d-04de-4f98-b5e4-5b3e617e31da	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ค21101	คณิตศาสตร์พื้นฐาน 1 (ม.1)	1	1	CORE	2026-10-09 12:01:57.966+07	2026-10-09 12:01:57.966+07
5672f0fc-cb74-41d3-a754-f0f86372992b	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ว21101	วิทยาศาสตร์และเทคโนโลยี 1 (ม.1)	1	1	CORE	2026-10-09 12:01:57.975+07	2026-10-09 12:01:57.975+07
11d82bca-1a48-4db5-a348-be7e4f47d305	7569727d-7d55-4623-92e2-c34884127588	ท31101	ภาษาไทยพื้นฐาน 1 (ม.4)	1	1	CORE	2026-10-09 12:01:57.981+07	2026-10-09 12:01:57.981+07
abcca187-88e4-4a6b-bb32-73e7eca1507f	7569727d-7d55-4623-92e2-c34884127588	ค31101	คณิตศาสตร์เพิ่มเติม 1 (ม.4)	2	1	CORE	2026-10-09 12:01:57.986+07	2026-10-09 12:01:57.986+07
55ae17a2-edef-4e9e-92a9-65ffba3f6d96	7569727d-7d55-4623-92e2-c34884127588	ว31101	ฟิสิกส์ 1 (ม.4)	2	1	CORE	2026-10-09 12:01:57.991+07	2026-10-09 12:01:57.991+07
\.


--
-- Data for Name: curriculums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.curriculums (id, tenant_id, code, name, degree_level, total_credits, description, is_active, created_at, updated_at, image_url, department_id, career_prospects, curriculum_year, degree_name_en, degree_name_th, duration_years, elective_credits, ge_credits, major_credits, name_en, objectives, pdf_url, philosophy) FROM stdin;
c8692e29-4a5a-436d-b663-97d1b48dfbe1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	CURR-JHS-2568	หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน ระดับมัธยมศึกษาตอนต้น (ม.1 - ม.3)	มัธยมศึกษาตอนต้น (ม.1 - ม.3)	88	หลักสูตร 3 ปี (ม.1-ม.3) เวลาเรียนพื้นฐาน 66 หน่วยกิต (2,640 ชม.) รายวิชาเพิ่มเติม 16 หน่วยกิต และกิจกรรมพัฒนาผู้เรียน 360 ชม. รวมเวลาเรียนตลอด 3 ปี ไม่น้อยกว่า 3,600 ชั่วโมง	t	2026-10-09 10:18:26.913+07	2026-10-09 10:18:26.913+07	https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80	ae2beb73-46cd-420a-b1cf-3ef0d1373286	ศึกษาต่อระดับมัธยมศึกษาตอนปลายสายสามัญ (แผนการเรียนวิทยาศาสตร์-คณิตศาสตร์, ศิลป์-คำนวณ, ศิลป์-ภาษา), สายอาชีวศึกษา (ปวช.), หรือสถาบันการศึกษาเฉพาะทาง	2551 (ปรับปรุง 2560)	Certificate of Lower Secondary Education	ประกาศนียบัตรมัธยมศึกษาตอนต้น (ม.3)	3	6	66	16	Basic Education Core Curriculum for Lower Secondary Education (Grade 7-9)	1. เพื่อปลูกฝังคุณธรรม จริยธรรม และค่านิยมที่พึงประสงค์ตามหลักพุทธศาสนา 2. เพื่อพัฒนาทักษะวิชาการพื้นฐาน 8 กลุ่มสาระการเรียนรู้ให้เต็มตามศักยภาพ 3. เพื่อเสริมสร้างสมรรถนะการคิดวิเคราะห์ วิทยาการคำนวณ และการสื่อสารสากล 4. เพื่อเตรียมความพร้อมในการศึกษาต่อระดับมัธยมศึกษาตอนปลาย	\N	มุ่งพัฒนาผู้เรียนให้มีความรู้คู่คุณธรรม มีปัญญารู้คิด มีความสามารถในการสื่อสาร การแก้ปัญหา ทักษะชีวิต และการใช้เทคโนโลยี บนพื้นฐานอัตลักษณ์พุทธธรรมของโรงเรียนสาธิต มจร
7569727d-7d55-4623-92e2-c34884127588	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	CURR-SHS-SCI-2568	หลักสูตรมัธยมศึกษาตอนปลาย แผนการเรียนวิทยาศาสตร์-คณิตศาสตร์ (ม.4 - ม.6)	มัธยมศึกษาตอนปลาย (ม.4 - ม.6)	84	หลักสูตร 3 ปี รายวิชาพื้นฐาน 41 หน่วยกิต และวิชาเพิ่มเติมวิทยาศาสตร์-คณิตศาสตร์เข้มข้น 37 หน่วยกิต รวม 84 หน่วยกิต (เวลาเรียนรวมตลอด 3 ปี ไม่น้อยกว่า 3,600 ชม.)	t	2026-10-09 10:18:26.931+07	2026-10-09 10:18:26.931+07	https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80	4e20abd2-3d49-40e4-a3b0-77fd9a6350c0	เข้าศึกษาต่อระดับอุดมศึกษาในคณะแพทยศาสตร์ ทันตแพทยศาสตร์ เภสัชศาสตร์ วิศวกรรมศาสตร์ วิทยาศาสตร์ เทคโนโลยีสารสนเทศ และสาขาวิทยาศาสตร์ประยุกต์ทุกสาขา	2551 (ปรับปรุง 2560)	Certificate of Senior Secondary Education	ประกาศนียบัตรมัธยมศึกษาตอนปลาย (ม.6)	3	6	41	37	Senior Secondary Curriculum: Science-Mathematics Program (Grade 10-12)	1. เพื่อสร้างความเข้มข้นทางวิชาการและทักษะการทดลองทางวิทยาศาสตร์และคณิตศาสตร์ขั้นสูง 2. พัฒนาทักษะการคิดเชิงคำนวณ โครงงานนวัตกรรม และเทคโนโลยีดิจิทัล 3. ปลูกฝังจิตวิญญาณแห่งการเป็นผู้นำที่มีคุณธรรมจริยธรรม 4. เตรียมความพร้อมอย่างสมบูรณ์สู่การเข้าศึกษาต่อในระดับอุดมศึกษา	\N	มุ่งเน้นความเป็นเลิศทางวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยี ควบคู่คุณธรรมตามแนวพุทธศาสนา เพื่อสร้างนักวิจัย นวัตกร และผู้นำทางวิชาการแห่งอนาคต
0ee15b94-e1d3-4ec3-9023-37a03f04f353	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	CURR-SHS-LANG-2568	หลักสูตรมัธยมศึกษาตอนปลาย แผนการเรียนภาษา-สังคมศึกษาและพุทธศาสน์ศึกษา (ม.4 - ม.6)	มัธยมศึกษาตอนปลาย (ม.4 - ม.6)	82	หลักสูตร 3 ปี รายวิชาพื้นฐาน 41 หน่วยกิต และวิชาเพิ่มเติมภาษา-สังคมศึกษา 35 หน่วยกิต รวม 82 หน่วยกิต ตอบโจทย์การศึกษาต่อด้านมนุษยศาสตร์และสังคมศาสตร์	t	2026-10-09 10:18:26.939+07	2026-10-09 10:18:26.939+07	https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80	0d4ee502-6307-4aa7-993e-f7ab0b010d80	เข้าศึกษาต่อระดับอุดมศึกษาในคณะนิติศาสตร์ รัฐศาสตร์ อักษรศาสตร์/มนุษยศาสตร์ ศิลปศาสตร์ ครุศาสตร์ นิเทศศาสตร์ บริหารธุรกิจ และพุทธศาสตร์	2551 (ปรับปรุง 2560)	Certificate of Senior Secondary Education	ประกาศนียบัตรมัธยมศึกษาตอนปลาย (ม.6)	3	6	41	35	Senior Secondary Curriculum: Languages, Social & Buddhist Studies (Grade 10-12)	1. พัฒนาทักษะการสื่อสารภาษาอังกฤษและภาษาที่สองในระดับสากล 2. เข้าใจประวัติศาสตร์ วัฒนธรรม และหลักธรรมทางพระพุทธศาสนาอย่างลึกซึ้ง 3. เสริมสร้างความเป็นผู้นำทางสังคม มนุษยศาสตร์ และการสื่อสารร่วมสมัย	\N	มุ่งสร้างเยาวชนผู้เชี่ยวชาญด้านภาษา การสื่อสารสากล ความเข้าใจพหุวัฒนธรรม และหลักพุทธธรรมเพื่อเป็นเสาหลักทางจริยธรรมของสังคม
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, tenant_id, parent_id, name, created_at, updated_at, code, description) FROM stdin;
b6b7da08-2176-4534-9d61-e172947e56f9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	กลุ่มสาระการเรียนรู้ภาษาไทย	2026-10-09 10:18:26.785+07	2026-10-09 10:18:26.785+07	THAI	จัดการเรียนการสอนทักษะการใช้ภาษาไทย การฟัง พูด อ่าน เขียน วรรณคดีและวรรณกรรม และการสื่อสารอย่างมีวิจารณญาณ
e2b20aed-5758-4596-997b-322a1521313f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	กลุ่มสาระการเรียนรู้คณิตศาสตร์	2026-10-09 10:18:26.871+07	2026-10-09 10:18:26.871+07	MATH	จัดการเรียนการสอนสาระจำนวนและพีชคณิต การวัดและเรขาคณิต สถิติและความน่าจะเป็น เพื่อเสริมสร้างทักษะการคิดวิเคราะห์และการแก้ปัญหา
4e20abd2-3d49-40e4-a3b0-77fd9a6350c0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี	2026-10-09 10:18:26.876+07	2026-10-09 10:18:26.876+07	SCI-TECH	จัดการเรียนการสอนวิทยาศาสตร์ชีวภาพ กายภาพ โลกและอวกาศ และเทคโนโลยี (วิทยาการคำนวณ / Coding) ตามหลักสูตรฉบับปรับปรุง พ.ศ. 2560
0d4ee502-6307-4aa7-993e-f7ab0b010d80	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2026-10-09 10:18:26.883+07	2026-10-09 10:18:26.883+07	SOC-BUD	จัดการเรียนการสอนศาสนา ศีลธรรม จริยธรรม หน้าที่พลเมือง เศรษฐศาสตร์ ภูมิศาสตร์ และวิชาประวัติศาสตร์อย่างเข้มข้นตามประกาศ ศธ. 2565 พร้อมบูรณาการพระพุทธศาสนาและภาษาบาลี
f5a67126-b6d2-444e-ac76-402f4819fe1d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา	2026-10-09 10:18:26.888+07	2026-10-09 10:18:26.888+07	HEALTH-PE	จัดการเรียนการสอนการเจริญเติบโต การสร้างเสริมสุขภาพ สมรรถภาพทางกาย การออกกำลังกาย และการป้องกันโรคเพื่อสุขภาวะที่สมบูรณ์
3083ef23-e065-4577-ac11-2088807c8627	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	กลุ่มสาระการเรียนรู้ศิลปะ	2026-10-09 10:18:26.892+07	2026-10-09 10:18:26.892+07	ARTS	จัดการเรียนการสอนทัศนศิลป์ ดนตรี และนาฏศิลป์ พัฒนาความคิดริเริ่มสร้างสรรค์และสุนทรียภาพทางศิลปวัฒนธรรมไทยและสากล
cc5dc1d4-1de4-4366-948c-8ab0bc8eaf0c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	กลุ่มสาระการเรียนรู้การงานอาชีพ	2026-10-09 10:18:26.897+07	2026-10-09 10:18:26.897+07	CAREER	จัดการเรียนการสอนทักษะการดำรงชีวิต การทำงาน การจัดการธุรกิจเบื้องต้น และทักษะพื้นฐานทางอาชีพเพื่อการพึ่งพาตนเอง
e5058bfd-087c-4963-9ad4-7e2865a06369	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ	2026-10-09 10:18:26.902+07	2026-10-09 10:18:26.902+07	FOREIGN-LANG	จัดการเรียนการสอนภาษาอังกฤษเพื่อการสื่อสารระดับสากล และภาษาต่างประเทศที่สอง (ภาษาจีน / ภาษาบาลี) เพื่อเปิดโลกทัศน์สู่สากล
ae2beb73-46cd-420a-b1cf-3ef0d1373286	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	กลุ่มงานบริหารวิชาการและกิจกรรมพัฒนาผู้เรียน	2026-10-09 10:18:26.906+07	2026-10-09 10:18:26.906+07	ACADEMIC	ดูแลโครงสร้างหลักสูตรสถานศึกษา กิจกรรมพัฒนาผู้เรียน (แนะแนว ลูกเสือ-เนตรนารี กิจกรรมเพื่อสังคมและสาธารณประโยชน์)
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
eefbac9c-0f0d-4f00-8883-c4ba4d5bfac0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-001	สมศักดิ์	ปัญญาดี	ผู้อำนวยการโรงเรียนสาธิต มจร	\N	t	2026-09-12 06:29:06.012+07	2026-10-09 10:08:24.321+07	\N
3d87f61a-934e-4898-9ef7-1c052e2ec5ce	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-003	พระมหาบุญเลิศ	เขมธโร	หัวหน้ากลุ่มสาระสังคมศึกษาและภาษาบาลี	\N	t	2026-09-12 06:29:06.022+07	2026-10-09 10:08:24.321+07	\N
e8d6991f-a7f2-44a4-b51e-d6d8f0f53eb8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-002	นิโรจน์	วงศ์เมืองแก่น	หัวหน้ากลุ่มสาระวิทยาศาสตร์และเทคโนโลยี	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-09-12 06:29:06.018+07	2026-10-09 10:08:24.321+07	/uploads/3c1e4a7d-7849-48ec-87a9-db9becbc48c2.jpg
\.


--
-- Data for Name: facilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facilities (id, tenant_id, type, name, capacity, status, created_at, updated_at, image_url) FROM stdin;
\.


--
-- Data for Name: grade_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grade_records (id, tenant_id, student_id, course_id, academic_year, semester, assignment_score, midterm_score, behavior_score, final_score, total_score, grade, is_passing, remarks, created_at, updated_at) FROM stdin;
a97d1bd2-853a-47f9-9d90-2a7adcf63527	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	28	18	20	26	92	4	t	\N	2026-10-09 12:01:58.41+07	2026-10-09 12:01:58.41+07
379b0b6f-2465-4f47-a4ad-226f6582e32b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	25	16	19	24	84	4	t	\N	2026-10-09 12:01:58.422+07	2026-10-09 12:01:58.422+07
089f41ce-a069-4fd8-bb07-6c707f1df26a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	22	14	18	22	76	3.5	t	\N	2026-10-09 12:01:58.426+07	2026-10-09 12:01:58.426+07
409f8674-343d-4dc7-8cf0-87e0a54128d6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	4bc941bd-088e-45d2-b574-60c76764e1f0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	20	13	17	18	68	2.5	t	\N	2026-10-09 12:01:58.43+07	2026-10-09 12:01:58.43+07
9e63e9f7-865d-413d-ba26-a6c4ff58d3ad	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	9ce3e0d1-ecfb-4434-9088-62f8d673d937	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	24	15	12	22	73	มส	f	เวลาเรียนไม่ถึง 80%	2026-10-09 12:01:58.435+07	2026-10-09 12:01:58.435+07
cdadc5e1-29d7-420c-8e5d-614530821a21	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	abcca187-88e4-4a6b-bb32-73e7eca1507f	2569	1	29	19	20	28	96	4	t	\N	2026-10-09 12:01:58.44+07	2026-10-09 12:01:58.44+07
2c1d9e30-80bf-41d3-953c-48181defd2aa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	abcca187-88e4-4a6b-bb32-73e7eca1507f	2569	1	26	17	20	25	88	4	t	\N	2026-10-09 12:01:58.444+07	2026-10-09 12:01:58.444+07
5d4b70c3-1a3a-4dcb-9bb4-a659ce0711cb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	abcca187-88e4-4a6b-bb32-73e7eca1507f	2569	1	23	15	19	21	78	3.5	t	\N	2026-10-09 12:01:58.449+07	2026-10-09 12:01:58.449+07
3c9b7bea-f5ab-455e-af6d-f21eae4e0c48	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	abcca187-88e4-4a6b-bb32-73e7eca1507f	2569	1	21	14	18	19	72	3	t	\N	2026-10-09 12:01:58.455+07	2026-10-09 12:01:58.455+07
968cace5-a235-4e6a-a9af-c3a617f8e688	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	abcca187-88e4-4a6b-bb32-73e7eca1507f	2569	1	18	12	17	18	65	2.5	t	\N	2026-10-09 12:01:58.458+07	2026-10-09 12:01:58.458+07
d78e82da-38e2-4e71-a0b4-fdcdbfc74b2f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	25	15	12	24	76	3.5	t	\N	2026-10-09 12:14:54.046+07	2026-10-09 12:14:54.046+07
ffd9bd23-c795-47d4-92a5-95b97b8b94d0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-09 12:14:54.085+07	2026-10-09 12:14:54.085+07
b5f873ad-b1af-47d6-9229-3c8c3213f8a6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-09 12:14:54.121+07	2026-10-09 12:14:54.121+07
7412dc1d-a95c-470f-9462-6e8d035796b3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-09 12:14:54.151+07	2026-10-09 12:14:54.151+07
8610c0ff-4e59-4707-941d-60ada2a1f90f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-09 12:14:54.182+07	2026-10-09 12:14:54.182+07
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
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, tenant_id, student_code, title, first_name, last_name, class_room, seat_no, gender, status, created_at, updated_at) FROM stdin;
99d6da80-3a97-409f-9264-6998723cad16	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-101	ด.ช.	กิตติศักดิ์	เจริญสุข	ม.1/1	1	ชาย	ACTIVE	2026-10-09 12:01:58.002+07	2026-10-09 12:01:58.002+07
140a5cb5-79a3-4415-a167-f451ed101dba	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-102	ด.ช.	ชญานนท์	พงษ์พิสุทธิ์	ม.1/1	2	ชาย	ACTIVE	2026-10-09 12:01:58.013+07	2026-10-09 12:01:58.013+07
31bfedfd-7d37-4966-8aef-15094675c01b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-103	ด.ญ.	ณิชากร	มงคลสวัสดิ์	ม.1/1	3	หญิง	ACTIVE	2026-10-09 12:01:58.017+07	2026-10-09 12:01:58.017+07
4bc941bd-088e-45d2-b574-60c76764e1f0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-104	ด.ญ.	ทักษอร	วรรณรัตน์	ม.1/1	4	หญิง	ACTIVE	2026-10-09 12:01:58.021+07	2026-10-09 12:01:58.021+07
9ce3e0d1-ecfb-4434-9088-62f8d673d937	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-105	ด.ช.	ปภังกร	รักษ์แดนไทย	ม.1/1	5	ชาย	ACTIVE	2026-10-09 12:01:58.026+07	2026-10-09 12:01:58.026+07
dbdb2e53-070f-4612-b197-d075c58cc138	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-401	นาย	พงศกร	เมธาวัฒน์	ม.4/1	1	ชาย	ACTIVE	2026-10-09 12:01:58.03+07	2026-10-09 12:01:58.03+07
565387f8-adba-45ab-9f39-19515556215c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-402	นาย	ภาณุวิชญ์	เลิศวิทยากุล	ม.4/1	2	ชาย	ACTIVE	2026-10-09 12:01:58.035+07	2026-10-09 12:01:58.035+07
b7bb2c30-effa-4016-9ba3-3519d3eae188	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-403	น.ส.	วริศรา	เกียรติบำรุง	ม.4/1	3	หญิง	ACTIVE	2026-10-09 12:01:58.039+07	2026-10-09 12:01:58.039+07
963fa502-7291-4568-bbd0-4c2a272173a0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-404	น.ส.	ศศิธร	ประเสริฐสิน	ม.4/1	4	หญิง	ACTIVE	2026-10-09 12:01:58.043+07	2026-10-09 12:01:58.043+07
07d2cd46-ca01-40d7-b321-9702f46c34fa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-405	นาย	อัครพล	ธนสารสมบูรณ์	ม.4/1	5	ชาย	ACTIVE	2026-10-09 12:01:58.048+07	2026-10-09 12:01:58.048+07
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
e56ff9bd-eee2-46f7-9969-b822fe0cbe7a	somchai@satit.mcu.ac.th	$2b$12$JPQ8.OAKPF34IkMV9Q/LpuAlppqcqX60R2f97UKi8Y3ugoeCjbPKq	สมชาย ใจดี	\N	credentials	\N	f	t	f	\N	\N	2026-09-12 07:21:20.387+07	2026-09-12 07:21:20.387+07
f83eae06-3b6c-47a4-ad26-4a6350d2f22a	somsri@satit.mcu.ac.th	$2b$12$X35EajqrkzP3JXa4RaHs3utWumtuKvY0W849ygghmOtjCNp/Nkwpi	สมศรี รักเรียน	\N	credentials	\N	f	t	f	\N	\N	2026-09-12 07:21:20.843+07	2026-09-12 07:21:20.843+07
b9b589e5-8938-478b-a419-9e32a492b658	raysfksjfk@gmail.com	$2b$12$6wHlI2qmvY0OR081EY.Lq.Hc.vLY.ye3K5lnDKnpJPBWltDCx5DU2	อาจารย์อรรถพล จอมมงคล	\N	credentials	\N	f	t	f	\N	\N	2026-09-12 07:21:21.329+07	2026-09-12 07:21:21.329+07
19ff7a93-fc4c-4265-8ecb-e75d0e9b1a6f	raysf5jfk@gmail.com	$2b$12$xDmcOQ5PLlnBFXeKtYt.Be9E/4KGW0rPun7vca3Z.NBHqJzUxD9D.	อาจารย์นิโรจน์ วงศ์เมืองแก่น	\N	credentials	\N	f	t	f	\N	\N	2026-09-12 07:21:21.817+07	2026-09-12 07:21:21.817+07
e6631061-fa77-4f80-ba43-e35cf6e918e7	raysf5t53tksjfk@gmail.com	$2b$12$JOMeTa8prxKL3K4uzucsbeg6g4gX9QvXhIF1Wn.keu7j1bHXNOeo.	พระมหาศุภชัย สุญาโณ	\N	credentials	\N	f	t	f	\N	\N	2026-09-12 07:21:22.308+07	2026-09-12 07:21:22.308+07
e665ca42-7399-4354-bb6b-f9b75deb9829	admin@app.local	$2b$12$JvCtZTYa583tFb97mNUv8Oqlfgg4M8.8z1LsnaeLiuNP9eu2.Udre	ผู้ดูแลสูงสุด (Admin)	\N	credentials	\N	t	t	f	th	2026-10-08 11:19:15.093+07	2026-09-11 03:08:15.394+07	2026-10-08 11:19:15.096+07
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
-- Name: attendances attendances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendances
    ADD CONSTRAINT attendances_pkey PRIMARY KEY (id);


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
-- Name: course_enrollments course_enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_enrollments
    ADD CONSTRAINT course_enrollments_pkey PRIMARY KEY (id);


--
-- Name: course_grading_schemes course_grading_schemes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_grading_schemes
    ADD CONSTRAINT course_grading_schemes_pkey PRIMARY KEY (id);


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
-- Name: grade_records grade_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade_records
    ADD CONSTRAINT grade_records_pkey PRIMARY KEY (id);


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
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


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
-- Name: attendances_class_date_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX attendances_class_date_idx ON public.attendances USING btree (class_date);


--
-- Name: attendances_student_id_course_id_class_date_period_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX attendances_student_id_course_id_class_date_period_key ON public.attendances USING btree (student_id, course_id, class_date, period);


--
-- Name: attendances_student_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX attendances_student_id_idx ON public.attendances USING btree (student_id);


--
-- Name: attendances_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX attendances_tenant_id_idx ON public.attendances USING btree (tenant_id);


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
-- Name: course_enrollments_course_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX course_enrollments_course_id_idx ON public.course_enrollments USING btree (course_id);


--
-- Name: course_enrollments_student_id_course_id_academic_year_semes_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX course_enrollments_student_id_course_id_academic_year_semes_key ON public.course_enrollments USING btree (student_id, course_id, academic_year, semester);


--
-- Name: course_enrollments_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX course_enrollments_tenant_id_idx ON public.course_enrollments USING btree (tenant_id);


--
-- Name: course_grading_schemes_course_id_class_room_academic_year_s_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX course_grading_schemes_course_id_class_room_academic_year_s_key ON public.course_grading_schemes USING btree (course_id, class_room, academic_year, semester);


--
-- Name: course_grading_schemes_course_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX course_grading_schemes_course_id_idx ON public.course_grading_schemes USING btree (course_id);


--
-- Name: course_grading_schemes_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX course_grading_schemes_tenant_id_idx ON public.course_grading_schemes USING btree (tenant_id);


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
-- Name: grade_records_course_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX grade_records_course_id_idx ON public.grade_records USING btree (course_id);


--
-- Name: grade_records_student_id_course_id_academic_year_semester_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX grade_records_student_id_course_id_academic_year_semester_key ON public.grade_records USING btree (student_id, course_id, academic_year, semester);


--
-- Name: grade_records_student_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX grade_records_student_id_idx ON public.grade_records USING btree (student_id);


--
-- Name: grade_records_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX grade_records_tenant_id_idx ON public.grade_records USING btree (tenant_id);


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
-- Name: students_class_room_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX students_class_room_idx ON public.students USING btree (class_room);


--
-- Name: students_tenant_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX students_tenant_id_idx ON public.students USING btree (tenant_id);


--
-- Name: students_tenant_id_student_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX students_tenant_id_student_code_key ON public.students USING btree (tenant_id, student_code);


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
-- Name: attendances attendances_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendances
    ADD CONSTRAINT attendances_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: attendances attendances_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendances
    ADD CONSTRAINT attendances_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: attendances attendances_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendances
    ADD CONSTRAINT attendances_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- Name: course_enrollments course_enrollments_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_enrollments
    ADD CONSTRAINT course_enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: course_enrollments course_enrollments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_enrollments
    ADD CONSTRAINT course_enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: course_enrollments course_enrollments_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_enrollments
    ADD CONSTRAINT course_enrollments_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: course_grading_schemes course_grading_schemes_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_grading_schemes
    ADD CONSTRAINT course_grading_schemes_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: course_grading_schemes course_grading_schemes_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_grading_schemes
    ADD CONSTRAINT course_grading_schemes_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- Name: grade_records grade_records_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade_records
    ADD CONSTRAINT grade_records_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: grade_records grade_records_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade_records
    ADD CONSTRAINT grade_records_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: grade_records grade_records_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade_records
    ADD CONSTRAINT grade_records_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- Name: students students_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE CASCADE;


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

\unrestrict aD7fH30R37iZiThZb6Hyrq6owZJfNM8Ps1XQaEc8JC71jZ1xrb1qVeYBLOu4khf

