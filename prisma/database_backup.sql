--
-- PostgreSQL database dump
--

\restrict B5M1MYFBtg4cn4SFIXrzA5Y7eHJbu2wPQ9AlQTDj2gKb51e4rUcHLmDKDCupe1U

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
ALTER TABLE IF EXISTS ONLY public.courses DROP CONSTRAINT IF EXISTS courses_instructor_id_fkey;
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
DROP INDEX IF EXISTS public.students_academic_year_idx;
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
DROP INDEX IF EXISTS public.courses_instructor_id_idx;
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
    cover_image text,
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
    credits double precision DEFAULT 1.0 NOT NULL,
    semester integer DEFAULT 1,
    course_type public."CourseType" DEFAULT 'CORE'::public."CourseType" NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    instructor_id uuid,
    instructor_name character varying(255),
    subject_group character varying(255)
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
    updated_at timestamp with time zone NOT NULL,
    academic_year character varying(10) DEFAULT '2569'::character varying NOT NULL,
    semester integer DEFAULT 1 NOT NULL
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
5a617369-87c3-44af-86f5-67e96b63be41	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	e665ca42-7399-4354-bb6b-f9b75deb9829	พิธีบําเพ็ญกุศลทักษิณานุปทานอุทิศถวายบูรพาจารย์	<p>&nbsp;</p>\n<div class="media-embed-wrap my-4 flex justify-center" style="margin: 16px 0; display: flex; justify-content: center;"><iframe style="overflow: hidden; width: 591px; height: 1017px; border: medium none currentcolor;" src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FSatitMahachula%2Fposts%2Fpfbid024QycqA7NzNx5RuifMpGRpE7R8c2vhyAUcdFroVjzhuoxvqaxneGzDQdfKGneNM3Tl&amp;show_text=true&amp;width=500" width="591" height="1017" frameborder="0" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen="allowfullscreen"></iframe></div>\n<p>&nbsp;</p>	https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/820205540_1676604017809627_4933750195808228096_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s2048x1365&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFCsroMUroMBafkYBUIFsY98a1JMV7liEnxrUkxXuWISfGwqJ82rjdaYdrBFH7P7dI&_nc_ohc=ARhUq1HGsE4Q7kNvwFmFvaJ&_nc_oc=AdqOWmIwIhcIx2Dg7skWtgNSPPMWZMRZyqpfZQP6W8BEJeyPdbSFLSxLZcViGojp6iFbGUOkLdvv4hOm7WDVH1vx&_nc_zt=23&_nc_ht=scontent.fbkk2-7.fna&_nc_gid=CCAv6AbUbdraJwk4lnQvcg&_nc_ss=7b2a8&oh=00_AQMfKhxZ7xtVWIfzwJMxKYhSWgHAcbsAq28UQygK57stFQ&oe=6AD55DF4	PUBLISHED	\N	2026-10-14 13:01:51.491+07	2026-10-14 13:23:09.309+07	\N	\N
a120ee80-2cec-4e8a-8aae-0b0db8408683	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	e665ca42-7399-4354-bb6b-f9b75deb9829	โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ขอแสดงความยินดี	<p>โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย<br class="html-br">ขอแสดงความยินดี สามเณรธราเทพ บัวสุวรรณ<br class="html-br">ได้รับชนะเลิศการแข่งขันตอบปัญหาวิชาการ<br class="html-br">8 กลุ่มสาระการเรียนรู้ ระดับชั้นมัธยมศึกษาตอนปลาย<br class="html-br">เนื่องในงานครบรอบวันสถาปนา 55 ปี โรงเรียนวชิรมกุฏ</p>	https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/825266481_1684616710341691_669161138617882737_n.jpg?stp=dst-jpg_tt6&cstp=mx1672x941&ctp=s1672x941&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFb2A5dOBZwi4JwQ9O41nsQzhE7lw3S3lvOETuXDdLeW7xkb11gv1i-V5s3EfHHl7I&_nc_ohc=ZB7s2NAbC80Q7kNvwHfjjLt&_nc_oc=AdoXSnWXZ3Y63uh-S_XQ46u6EOibOVeSAcN-M7CVymvbvm8vztFEcHpJxne9dk7yvZEih27k6zOoBErnZjveDVPc&_nc_zt=23&_nc_ht=scontent.fbkk2-7.fna&_nc_gid=Psu-Lt0tW_XCEVPgndm1vA&_nc_ss=7b2a8&oh=00_AQPF_agr4xCNwgKT6BE1sgW1rfeu2OdnDFAsC3H7DE7mxg&oe=6AD539E4#top	PUBLISHED	\N	2026-10-14 12:39:26.479+07	2026-10-14 12:58:53.09+07	\N	\N
373b533d-c6d3-4c04-98d5-cdf510dc0aa7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	e665ca42-7399-4354-bb6b-f9b75deb9829	กิจกรรมปฏิบัติธรรมทางพระพุทธศาสนา  เฉลิมพระเกียรติพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว	<p>✍️ภาพรวมกิจกรรมปฏิบัติธรรมทางพระพุทธศาสนา เฉลิมพระเกียรติพระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว เนื่องในโอกาสวันเฉลิมพระชนมพรรษา ๒๘ กรกฎาคม ณ อาคาร ๗๒ ปี พระวิสุทธาธิบดี (อาคารหอฉันชั้น ๔) โดย โรงเรียนสาธิต มจร ร่วมกับ สถาบันวิปัสสนาธุระ มจร 🗓️ระหว่างวันที่ ๒๐-๒๓ กรกฎาคม พ.ศ.๒๕๖๙ . <span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x6prxxf xvq8zen x1s688f x1fey0fg"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1heor9g xkrqix3 x1sur9pj x1s688f" tabindex="0" role="link" href="https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FH09xT-JoMRw%3Fsi%3D451mXga0acoZbBc-%26fbclid%3DIwZXh0bgNhZW0CMTAAcGRvZgVicmlkETFhSVNaVFdQejdHT2RhOVREc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHkm2JLobjOQKO1t91BB_B9V74A3skMZUfsM3cqOamVbisuckU2gzrQm6fDSr_aem_5UhqlLJynlQcmjvOfM_7IA&amp;h=AUBW97mBNClE2W3byV-tbykveK-H2mZ04X7suNXJvWcSddg63MClJ3JIUgGlpQb589HxnGL3PU_sNMD_5wc9cWeppaP7aVtd1EzqvzsxiRC1LrFJOWQA4X3wZ-ith_wZf9EMFHds2F1ttxT5d4P9Maof18Esfw&amp;__tn__=K" target="_blank" rel="nofollow noopener noreferrer">https://youtu.be/H09xT-JoMRw?si=451mXga0acoZbBc-</a></span> ผลิตสื่อโดย ส่วนวางแผนและพัฒนาการอบรม สถาบันวิปัสสนาธุระ มจร เผยแพร่สื่อ โดย MCU TV CHANNEL</p>\n<div class="media-embed-wrap my-4 flex justify-center" style="margin: 16px 0; display: flex; justify-content: center;"><iframe style="border: none; overflow: hidden;" src="https://www.facebook.com/plugins/video.php?height=313&amp;href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2567447867043075%2F&amp;show_text=false&amp;width=560&amp;t=0" width="560" height="313" frameborder="0" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen="allowfullscreen"></iframe></div>	https://scontent.fbkk2-8.fna.fbcdn.net/v/t39.30808-6/750615715_1613288010807895_1604399657505521245_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s2048x1365&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHZcvkxsNxo3q5ccpOTOnaK-OzQBtZ-Wp_47NAG1n5an3bgzp2_uIJuEokzoD8jkjc&_nc_ohc=YRMYAxVS_D0Q7kNvwHLOQzZ&_nc_oc=Adq1B0rycFDqFfgQFe0UT1dtJPxehhiX9CG2E5VPQgZQhDbD8N5OTwxvd2e_63jFXtahMdz5LLt6z_kegO4TC1IY&_nc_zt=23&_nc_ht=scontent.fbkk2-8.fna&_nc_gid=MbhEYiy5AjpyYHWl6zMkIw&_nc_ss=7b2a8&oh=00_AQPARRY08FDOclqR_Lo68-ii9bygcUK5bTM8a04-d4-0Hg&oe=6AD53B89	PUBLISHED	\N	2026-10-14 13:14:33.077+07	2026-10-14 13:21:29.509+07	\N	\N
\.


--
-- Data for Name: attendances; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendances (id, tenant_id, student_id, course_id, class_date, period, status, remarks, created_at, updated_at) FROM stdin;
66bd35a7-9c0a-4e95-8abe-5f7ae5f2511d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.054+07	2026-10-09 12:01:58.054+07
1c4ece47-0538-4b9f-b032-119d4de154b4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.068+07	2026-10-09 12:01:58.068+07
e3811c17-7d96-48d7-aca2-4582cd56b32e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.073+07	2026-10-09 12:01:58.073+07
bbf444f3-8c03-4fb3-9272-4bdddfc0184a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.108+07	2026-10-09 12:01:58.108+07
f8054e85-a4e3-4c21-a236-ebc201fd5843	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.112+07	2026-10-09 12:01:58.112+07
70f9819a-8e04-4468-b646-9995b762ae69	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.115+07	2026-10-09 12:01:58.115+07
14a8c9b9-4034-49c7-a5cc-086de0effd7e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.143+07	2026-10-09 12:01:58.143+07
0f2ac5ec-17dc-4a33-bd68-cd02f7434c96	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.146+07	2026-10-09 12:01:58.146+07
9bfef093-485c-482b-9f9d-c778244aa450	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.15+07	2026-10-09 12:01:58.15+07
69f27729-b79b-4e79-a4ee-ade8aeb507b1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.176+07	2026-10-09 12:01:58.176+07
89cbab2c-e7cc-47dc-97cb-f6ddce43907e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-27	1	LATE	\N	2026-10-09 12:01:58.178+07	2026-10-09 12:01:58.178+07
d991a2b4-0ebb-4ec4-8c3e-4e6439f9d93a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.181+07	2026-10-09 12:01:58.181+07
c945b703-68a2-4fca-bb3e-34b4f0d8cd52	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.208+07	2026-10-09 12:01:58.208+07
2504411c-1f6a-48a3-846c-dbedcc04af7c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.211+07	2026-10-09 12:01:58.211+07
cbcd8595-e89d-44a4-b4c4-737d0e136478	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.215+07	2026-10-09 12:01:58.215+07
83701edc-da4a-4424-9d0c-4ce9aa61b78d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.242+07	2026-10-09 12:01:58.242+07
7f93fef3-2e93-4aaa-ab44-bb9978bafa6f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.245+07	2026-10-09 12:01:58.245+07
7bfc98f8-e712-4967-abe4-8d504c721e9b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-02	1	LEAVE	\N	2026-10-09 12:01:58.248+07	2026-10-09 12:01:58.248+07
48a946d4-58d6-46f5-8ed2-d407e8a541c8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.275+07	2026-10-09 12:01:58.275+07
7f5d78b1-c458-46a9-b6a2-2c9666a35d94	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	\N	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.086+07	2026-10-09 12:01:58.086+07
9e35be29-4557-467b-85c8-a98644809407	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	\N	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.09+07	2026-10-09 12:01:58.09+07
f7fce96e-aae5-4fd0-8412-2378168fa4f7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	\N	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.095+07	2026-10-09 12:01:58.095+07
c08e8594-9874-4bf5-9c70-3f766faf0654	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	\N	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.1+07	2026-10-09 12:01:58.1+07
e6795a47-8fd2-43fa-8b65-8b52a0c900dd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	\N	2026-05-18	1	PRESENT	\N	2026-10-09 12:01:58.104+07	2026-10-09 12:01:58.104+07
5ca68760-a634-4c08-94e8-7f085dfb0fa3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	\N	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.126+07	2026-10-09 12:01:58.126+07
5670d6b9-19f3-492b-8024-f17ee602f2c3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	\N	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.129+07	2026-10-09 12:01:58.129+07
a3314fef-9865-472d-98d9-3b91fed83c1c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.278+07	2026-10-09 12:01:58.278+07
9edb9bb3-1fd4-4d2b-9843-bde6d55cc973	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.282+07	2026-10-09 12:01:58.282+07
ce813e53-69e5-4d14-bc3a-78c11eadb8de	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.308+07	2026-10-09 12:01:58.308+07
d76af95e-20dc-427d-8f32-036e0655b0d5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.312+07	2026-10-09 12:01:58.312+07
cec49123-22cb-4124-aa2a-465520c0f1bd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.315+07	2026-10-09 12:01:58.315+07
3b05b211-939c-4b7d-b000-117d61ebf74a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.341+07	2026-10-09 12:01:58.341+07
9893217d-04f3-4023-b68a-a67d9341b6ef	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.345+07	2026-10-09 12:01:58.345+07
ba1e892c-2ed2-4618-a8d7-4bae65b4a145	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.348+07	2026-10-09 12:01:58.348+07
35ffc5ad-4c78-4c92-b131-a2364397924f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.376+07	2026-10-09 12:01:58.376+07
b4fe8986-8ac0-4ef4-91c1-caa3978f1349	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.379+07	2026-10-09 12:01:58.379+07
fd1fb1c1-a518-484c-94db-1e865bd9a3aa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.382+07	2026-10-09 12:01:58.382+07
095c85bb-9487-44be-bfa8-f9906b34e402	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-09	1	PRESENT	\N	2026-10-09 12:15:47.004+07	2026-10-09 12:56:30.147+07
2a3ab258-10e9-4f77-98af-41e8a0908157	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-09	1	PRESENT	\N	2026-10-09 12:15:47.009+07	2026-10-09 12:56:30.152+07
b86a029e-df50-4e43-8bf8-96454f5a5a54	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	\N	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.293+07	2026-10-09 12:01:58.293+07
11385e3c-bf6e-4016-846d-178dde8f7cbe	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	\N	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.296+07	2026-10-09 12:01:58.296+07
b63dd5c3-6764-4b1a-8aa6-301b991d368d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	\N	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.299+07	2026-10-09 12:01:58.299+07
09f6771e-5370-48a1-8ff2-ae509f49ce4d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-09	1	PRESENT	\N	2026-10-09 12:15:47.014+07	2026-10-09 12:56:30.157+07
71aa8786-1978-46ac-8bd1-ff8f1dfafa61	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	\N	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.133+07	2026-10-09 12:01:58.133+07
9ea77316-51e7-4ada-a9a1-9099886b87c4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	\N	2026-05-21	1	LATE	\N	2026-10-09 12:01:58.136+07	2026-10-09 12:01:58.136+07
63700733-d148-4d2d-9410-4ceb3e4c207b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	\N	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.139+07	2026-10-09 12:01:58.139+07
8dbdba2f-1980-4019-aa19-d8c79384078b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	\N	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.159+07	2026-10-09 12:01:58.159+07
1b783be7-36b4-4f0c-882e-2f8dc2e03e14	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-09	1	ABSENT	\N	2026-10-09 12:15:46.875+07	2026-10-09 12:56:29.902+07
867957d2-d428-419a-8f6f-005d98b661a5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-09	1	PRESENT	\N	2026-10-09 12:15:46.997+07	2026-10-09 12:56:30.143+07
920294e2-f9b0-4533-8e7f-363aba8a7e2e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	\N	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.163+07	2026-10-09 12:01:58.163+07
ce316055-238e-4bc0-b2aa-5c056a1784ac	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	\N	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.166+07	2026-10-09 12:01:58.166+07
f4ce2970-63e5-4eab-988e-b0b30c1314a8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	\N	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.169+07	2026-10-09 12:01:58.169+07
64450b38-8408-4eb2-b24d-0f431748698e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	\N	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.172+07	2026-10-09 12:01:58.172+07
cd8dfca4-fc37-4c67-9552-d704e9d41a9c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	\N	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.191+07	2026-10-09 12:01:58.191+07
1ce36420-62f1-49c9-8931-d13ca6f4bd2b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	\N	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.195+07	2026-10-09 12:01:58.195+07
b97daf45-1ac8-4d2f-8cc2-f34056abb2bf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	\N	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.198+07	2026-10-09 12:01:58.198+07
180a8af8-848e-414b-9dfb-3ddc0817b784	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	\N	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.302+07	2026-10-09 12:01:58.302+07
c85da275-d240-4fb3-a202-e8d1fd4c7818	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	\N	2026-06-05	1	PRESENT	\N	2026-10-09 12:01:58.305+07	2026-10-09 12:01:58.305+07
4ba91d2b-61e2-4c97-b198-67bd48dde9ec	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	\N	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.325+07	2026-10-09 12:01:58.325+07
eb646f01-f14e-423b-9ea3-98b502c47315	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	\N	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.328+07	2026-10-09 12:01:58.328+07
662883ed-4dd2-4caf-b86d-3e3c796a1b99	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	\N	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.331+07	2026-10-09 12:01:58.331+07
f4f49bd7-8295-47d6-81e3-01d17176c052	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	\N	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.334+07	2026-10-09 12:01:58.334+07
c317df22-8ca6-4d28-a76e-c666edd0ec06	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	\N	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.338+07	2026-10-09 12:01:58.338+07
eabc8ba8-5090-4e96-9e37-75b7f2c69f49	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	\N	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.358+07	2026-10-09 12:01:58.358+07
9fd76244-6421-4f1e-b9d1-78d8ccfd0776	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	\N	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.361+07	2026-10-09 12:01:58.361+07
1632b3b9-35d2-44ff-9c41-a1defb4e97ca	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	\N	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.364+07	2026-10-09 12:01:58.364+07
4d652736-575b-476e-a068-40b8ec7cf88b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	\N	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.368+07	2026-10-09 12:01:58.368+07
250d4633-32fc-48b7-ba44-425397b1aaf0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	\N	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.201+07	2026-10-09 12:01:58.201+07
9f5f34b6-e673-444f-b03d-75d7eb3f2f6a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	\N	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.205+07	2026-10-09 12:01:58.205+07
a37d1778-f59a-4108-b105-db0634f9fc77	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	\N	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.225+07	2026-10-09 12:01:58.225+07
70633351-3e22-4651-a887-ebbd78168260	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	\N	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.229+07	2026-10-09 12:01:58.229+07
418834b7-b80e-4801-b64e-b3abb1c782cc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	\N	2026-05-30	1	LEAVE	\N	2026-10-09 12:01:58.232+07	2026-10-09 12:01:58.232+07
270d19fd-3a2d-4810-92c8-274457a52f3a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	\N	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.236+07	2026-10-09 12:01:58.236+07
15630c59-8f19-4a79-89f9-f3c1807ba157	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	\N	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.239+07	2026-10-09 12:01:58.239+07
90a095a2-0f38-4a86-9bf2-f9836719c812	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	\N	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.258+07	2026-10-09 12:01:58.258+07
8c95b40c-e92e-4f3a-beb1-060420236406	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	\N	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.261+07	2026-10-09 12:01:58.261+07
32f1f9f8-f8f6-4528-953e-360082371e67	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	\N	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.265+07	2026-10-09 12:01:58.265+07
ef6e2dac-b264-41ef-8173-859761cc0d72	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	\N	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.268+07	2026-10-09 12:01:58.268+07
cfe662aa-88f7-4985-bb17-98c89696f36c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	\N	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.271+07	2026-10-09 12:01:58.271+07
d03edab2-714d-4de3-ac2f-d6f8768b0907	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	\N	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.372+07	2026-10-09 12:01:58.372+07
a963b6f1-98f7-4598-8cf2-ab47e04087a1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	\N	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.392+07	2026-10-09 12:01:58.392+07
9d1c515b-28a9-4087-b4f0-f2b24242629d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	\N	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.395+07	2026-10-09 12:01:58.395+07
dfd797f5-7d2c-4ec2-b857-bd450904af08	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	\N	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.398+07	2026-10-09 12:01:58.398+07
bf6b1a74-3918-4362-8ea5-2e218e4672be	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	\N	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.402+07	2026-10-09 12:01:58.402+07
a15deef8-dca1-4ec2-a6cd-2e8b6ef0ef9c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	\N	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.406+07	2026-10-09 12:01:58.406+07
f5df22ee-7b13-4bfd-909d-26d2cd4d0962	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	\N	2026-10-09	2	ABSENT	\N	2026-10-09 12:22:57.151+07	2026-10-09 12:22:57.151+07
da5021be-6456-4556-90cf-0cbf42481372	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	\N	2026-10-09	2	ABSENT	\N	2026-10-09 12:22:57.259+07	2026-10-09 12:22:57.259+07
9d0c3c3f-a822-4cd0-938d-c3b3a9743b28	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	\N	2026-10-09	2	ABSENT	\N	2026-10-09 12:22:57.264+07	2026-10-09 12:22:57.264+07
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
7d9e2de1-56c7-4d20-8c31-cbc828cf5589	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e665ca42-7399-4354-bb6b-f9b75deb9829	tenant.settings_update	tenant	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	{"code": "DEMO", "smtp": {"from": "นิโรจน์ วงศ์เมืองแก่น <hero2027@gmail.com>", "host": "smtp.gmail.com", "pass": "********", "port": 465, "user": "hero2027@gmail.com", "secure": true}, "nameEn": "SATIT MCU", "nameTh": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "logoUrl": "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg", "palette": "blue", "geminiApiKey": ""}	{"nameEn": "SATIT MCU", "nameTh": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "actorId": "e665ca42-7399-4354-bb6b-f9b75deb9829", "logoUrl": "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg", "palette": "pink", "smtpFrom": "นิโรจน์ วงศ์เมืองแก่น <hero2027@gmail.com>", "smtpHost": "smtp.gmail.com", "smtpPass": "********", "smtpPort": 465, "smtpUser": "hero2027@gmail.com", "tenantId": "f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d", "smtpSecure": true, "geminiApiKey": ""}	\N	2026-10-14 09:07:50.298+07
678921cd-3a80-4ef8-99bc-1a4940b44920	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e665ca42-7399-4354-bb6b-f9b75deb9829	tenant.settings_update	tenant	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	{"code": "DEMO", "smtp": {"from": "นิโรจน์ วงศ์เมืองแก่น <hero2027@gmail.com>", "host": "smtp.gmail.com", "pass": "********", "port": 465, "user": "hero2027@gmail.com", "secure": true}, "nameEn": "SATIT MCU", "nameTh": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "logoUrl": "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg", "palette": "pink", "geminiApiKey": ""}	{"nameEn": "SATIT MCU", "nameTh": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "actorId": "e665ca42-7399-4354-bb6b-f9b75deb9829", "logoUrl": "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg", "palette": "pink", "smtpFrom": "SATIT MCU System <hero2027@gmail.com>", "smtpHost": "smtp.gmail.com", "smtpPass": "********", "smtpPort": 465, "smtpUser": "hero2027@gmail.com", "tenantId": "f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d", "smtpSecure": true, "geminiApiKey": ""}	\N	2026-10-14 09:11:12.489+07
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

COPY public.courses (id, curriculum_id, course_code, name, credits, semester, course_type, created_at, updated_at, instructor_id, instructor_name, subject_group) FROM stdin;
5672f0fc-cb74-41d3-a754-f0f86372992b	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ว21101	วิทยาศาสตร์และเทคโนโลยี 1 (ม.1)	1	1	CORE	2026-10-09 12:01:57.975+07	2026-10-09 16:29:43.969+07	e8d6991f-a7f2-44a4-b51e-d6d8f0f53eb8	นิโรจน์ วงศ์เมืองแก่น	กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี
f24e501d-04de-4f98-b5e4-5b3e617e31da	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ค21101	คณิตศาสตร์พื้นฐาน 1 (ม.1)	1	1	CORE	2026-10-09 12:01:57.966+07	2026-10-12 13:04:56.922+07	e8d6991f-a7f2-44a4-b51e-d6d8f0f53eb8	นิโรจน์ วงศ์เมืองแก่น	\N
6c7a7261-4c54-461a-8d41-ac03411f930e	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ท21101	ภาษาไทยพื้นฐาน 1 (ม.1)	1	1	CORE	2026-10-09 12:01:57.95+07	2026-10-12 13:04:56.933+07	eefbac9c-0f0d-4f00-8883-c4ba4d5bfac0	สมศักดิ์ ปัญญาดี	\N
\.


--
-- Data for Name: curriculums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.curriculums (id, tenant_id, code, name, degree_level, total_credits, description, is_active, created_at, updated_at, image_url, department_id, career_prospects, curriculum_year, degree_name_en, degree_name_th, duration_years, elective_credits, ge_credits, major_credits, name_en, objectives, pdf_url, philosophy) FROM stdin;
0ee15b94-e1d3-4ec3-9023-37a03f04f353	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	CURR-SHS-LANG-2568	หลักสูตรมัธยมศึกษาตอนปลาย แผนการเรียนภาษา-สังคมศึกษาและพุทธศาสน์ศึกษา (ม.4 - ม.6)	มัธยมศึกษาตอนปลาย (ม.4 - ม.6)	82	หลักสูตร 3 ปี รายวิชาพื้นฐาน 41 หน่วยกิต และวิชาเพิ่มเติมภาษา-สังคมศึกษา 35 หน่วยกิต รวม 82 หน่วยกิต ตอบโจทย์การศึกษาต่อด้านมนุษยศาสตร์และสังคมศาสตร์	t	2026-10-09 10:18:26.939+07	2026-10-14 06:23:44.413+07	https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80	0d4ee502-6307-4aa7-993e-f7ab0b010d80	เข้าศึกษาต่อระดับอุดมศึกษาในคณะนิติศาสตร์ รัฐศาสตร์ อักษรศาสตร์/มนุษยศาสตร์ ศิลปศาสตร์ ครุศาสตร์ นิเทศศาสตร์ บริหารธุรกิจ และพุทธศาสตร์	2551 (ปรับปรุง 2560)	Certificate of Senior Secondary Education	ประกาศนียบัตรมัธยมศึกษาตอนปลาย (ม.6)	3	6	41	35	Senior Secondary Curriculum: Languages, Social & Buddhist Studies (Grade 10-12)	1. พัฒนาทักษะการสื่อสารภาษาอังกฤษและภาษาที่สองในระดับสากล 2. เข้าใจประวัติศาสตร์ วัฒนธรรม และหลักธรรมทางพระพุทธศาสนาอย่างลึกซึ้ง 3. เสริมสร้างความเป็นผู้นำทางสังคม มนุษยศาสตร์ และการสื่อสารร่วมสมัย	https://drive.google.com/file/d/1Xl1TatpbXwduozCxibCINfEihF9F_aEb/view?usp=sharing	มุ่งสร้างเยาวชนผู้เชี่ยวชาญด้านภาษา การสื่อสารสากล ความเข้าใจพหุวัฒนธรรม และหลักพุทธธรรมเพื่อเป็นเสาหลักทางจริยธรรมของสังคม
c8692e29-4a5a-436d-b663-97d1b48dfbe1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	CURR-JHS-2568	หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน ระดับมัธยมศึกษาตอนต้น (ม.1 - ม.3)	มัธยมศึกษาตอนต้น (ม.1 - ม.3)	88	หลักสูตร 3 ปี (ม.1-ม.3) เวลาเรียนพื้นฐาน 66 หน่วยกิต (2,640 ชม.) รายวิชาเพิ่มเติม 16 หน่วยกิต และกิจกรรมพัฒนาผู้เรียน 360 ชม. รวมเวลาเรียนตลอด 3 ปี ไม่น้อยกว่า 3,600 ชั่วโมง	t	2026-10-09 10:18:26.913+07	2026-10-14 06:38:25.821+07	https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80	ae2beb73-46cd-420a-b1cf-3ef0d1373286	ศึกษาต่อระดับมัธยมศึกษาตอนปลายสายสามัญ (แผนการเรียนวิทยาศาสตร์-คณิตศาสตร์, ศิลป์-คำนวณ, ศิลป์-ภาษา), สายอาชีวศึกษา (ปวช.), หรือสถาบันการศึกษาเฉพาะทาง	2551 (ปรับปรุง 2560)	Certificate of Lower Secondary Education	ประกาศนียบัตรมัธยมศึกษาตอนต้น (ม.3)	3	6	66	16	Basic Education Core Curriculum for Lower Secondary Education (Grade 7-9)	1. เพื่อปลูกฝังคุณธรรม จริยธรรม และค่านิยมที่พึงประสงค์ตามหลักพุทธศาสนา 2. เพื่อพัฒนาทักษะวิชาการพื้นฐาน 8 กลุ่มสาระการเรียนรู้ให้เต็มตามศักยภาพ 3. เพื่อเสริมสร้างสมรรถนะการคิดวิเคราะห์ วิทยาการคำนวณ และการสื่อสารสากล 4. เพื่อเตรียมความพร้อมในการศึกษาต่อระดับมัธยมศึกษาตอนปลาย	https://drive.google.com/file/d/1Xl1TatpbXwduozCxibCINfEihF9F_aEb/view?usp=sharing	มุ่งพัฒนาผู้เรียนให้มีความรู้คู่คุณธรรม มีปัญญารู้คิด มีความสามารถในการสื่อสาร การแก้ปัญหา ทักษะชีวิต และการใช้เทคโนโลยี บนพื้นฐานอัตลักษณ์พุทธธรรมของโรงเรียนสาธิต มจร
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
d78e82da-38e2-4e71-a0b4-fdcdbfc74b2f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	25	15	12	24	76	3.5	t	\N	2026-10-09 12:14:54.046+07	2026-10-09 12:14:54.046+07
ffd9bd23-c795-47d4-92a5-95b97b8b94d0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-09 12:14:54.085+07	2026-10-09 12:14:54.085+07
b5f873ad-b1af-47d6-9229-3c8c3213f8a6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-09 12:14:54.121+07	2026-10-09 12:14:54.121+07
7412dc1d-a95c-470f-9462-6e8d035796b3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-09 12:14:54.151+07	2026-10-09 12:14:54.151+07
8610c0ff-4e59-4707-941d-60ada2a1f90f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-09 12:14:54.182+07	2026-10-09 12:14:54.182+07
a97d1bd2-853a-47f9-9d90-2a7adcf63527	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	28	9	16	19	72	3	t	\N	2026-10-09 12:01:58.41+07	2026-10-12 12:50:24.555+07
39d28e2e-d90f-470c-848f-5415cc0a655b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-12 12:50:25.097+07	2026-10-12 12:50:25.097+07
379b0b6f-2465-4f47-a4ad-226f6582e32b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	25	16	19	24	84	4	t	\N	2026-10-09 12:01:58.422+07	2026-10-12 12:50:25.143+07
c8f7db86-6cd5-424e-8b8c-6dd47f354475	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-12 12:50:25.196+07	2026-10-12 12:50:25.196+07
089f41ce-a069-4fd8-bb07-6c707f1df26a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	22	14	18	22	76	3.5	t	\N	2026-10-09 12:01:58.426+07	2026-10-12 12:50:25.236+07
f55a1dff-1038-4762-a9d7-cd06b8e3f643	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-12 12:50:25.274+07	2026-10-12 12:50:25.274+07
4413e998-d477-4491-9913-1200b2b0a799	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-12 12:50:25.351+07	2026-10-12 12:50:25.351+07
858d8507-7310-4cbb-b021-b4e64c8b61b9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	0	0	0	0	0	0	f	\N	2026-10-12 12:50:25.389+07	2026-10-12 12:50:25.389+07
7b310a8e-aaab-46cb-8b8c-890d1eaa876b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2570	1	13.5	10	10	25	58.5	1.5	t	\N	2026-10-12 13:38:38.724+07	2026-10-12 13:38:38.724+07
66397dac-93e0-43ee-b2db-c02b7f861256	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	f24e501d-04de-4f98-b5e4-5b3e617e31da	2570	1	0	0	0	0	0	0	f	\N	2026-10-12 13:38:38.792+07	2026-10-12 13:38:38.792+07
716d08dc-bc7c-40f6-bd3c-815b868d334d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	f24e501d-04de-4f98-b5e4-5b3e617e31da	2570	1	0	0	0	0	0	0	f	\N	2026-10-12 13:38:38.834+07	2026-10-12 13:38:38.834+07
ff5d08cf-6002-45c2-904c-ee118db130dd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	f24e501d-04de-4f98-b5e4-5b3e617e31da	2570	1	0	0	0	0	0	0	f	\N	2026-10-12 13:38:38.872+07	2026-10-12 13:38:38.872+07
e59b3fc3-bb2f-4446-bfa3-a7558946eb3c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	f24e501d-04de-4f98-b5e4-5b3e617e31da	2570	1	0	0	0	0	0	0	f	\N	2026-10-12 13:38:38.91+07	2026-10-12 13:38:38.91+07
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

COPY public.students (id, tenant_id, student_code, title, first_name, last_name, class_room, seat_no, gender, status, created_at, updated_at, academic_year, semester) FROM stdin;
b7bb2c30-effa-4016-9ba3-3519d3eae188	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-403	น.ส.	วริศรา	เกียรติบำรุง	ม.4/1	3	หญิง	ACTIVE	2026-10-09 12:01:58.039+07	2026-10-09 12:01:58.039+07	2569	1
963fa502-7291-4568-bbd0-4c2a272173a0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-404	น.ส.	ศศิธร	ประเสริฐสิน	ม.4/1	4	หญิง	ACTIVE	2026-10-09 12:01:58.043+07	2026-10-09 12:01:58.043+07	2569	1
07d2cd46-ca01-40d7-b321-9702f46c34fa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-405	นาย	อัครพล	ธนสารสมบูรณ์	ม.4/1	5	ชาย	ACTIVE	2026-10-09 12:01:58.048+07	2026-10-09 12:01:58.048+07	2569	1
99d6da80-3a97-409f-9264-6998723cad16	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-101	ด.ช.	กิตติศักดิ์	รักเรียน	ม.1/1	1	ชาย	ACTIVE	2026-10-09 12:01:58.002+07	2026-10-09 15:54:00.568+07	2569	2
140a5cb5-79a3-4415-a167-f451ed101dba	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-102	ด.ญ.	จินตนา	ปัญญาดี	ม.1/1	2	หญิง	ACTIVE	2026-10-09 12:01:58.013+07	2026-10-09 15:54:00.582+07	2569	2
31bfedfd-7d37-4966-8aef-15094675c01b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-103	ด.ช.	ณัฐดนัย	สุขเกษม	ม.1/1	3	ชาย	ACTIVE	2026-10-09 12:01:58.017+07	2026-10-09 15:54:00.594+07	2569	2
dbdb2e53-070f-4612-b197-d075c58cc138	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-401	นาย	ธนพล	รุ่งเรือง	ม.4/1	1	ชาย	ACTIVE	2026-10-09 12:01:58.03+07	2026-10-09 15:54:00.603+07	2569	2
565387f8-adba-45ab-9f39-19515556215c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-402	น.ส.	พรทิพย์	วิไลวรรณ	ม.4/1	2	หญิง	ACTIVE	2026-10-09 12:01:58.035+07	2026-10-09 15:54:00.615+07	2569	2
0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-101	ด.ช.	กิตติศักดิ์	รักเรียน	ม.1/1	1	ชาย	ACTIVE	2026-10-09 15:58:48.339+07	2026-10-09 15:58:48.339+07	2570	1
cb3fef95-e768-4db0-99da-dbd78974ebd0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-102	ด.ญ.	จินตนา	ปัญญาดี	ม.1/1	2	หญิง	ACTIVE	2026-10-09 15:58:48.573+07	2026-10-09 15:58:48.573+07	2570	1
65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-103	ด.ช.	ณัฐดนัย	สุขเกษม	ม.1/1	3	ชาย	ACTIVE	2026-10-09 15:58:48.585+07	2026-10-09 15:58:48.585+07	2570	1
7f262b09-224f-4a68-b421-aecfce9b5713	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-401	นาย	ธนพล	รุ่งเรือง	ม.1/1	4	ชาย	ACTIVE	2026-10-09 15:58:48.595+07	2026-10-09 15:58:48.595+07	2570	1
64b57e5b-62af-46a1-a58d-d1368e09d0bf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-402	น.ส.	พรทิพย์	วิไลวรรณ	ม.1/1	5	หญิง	ACTIVE	2026-10-09 15:58:48.604+07	2026-10-09 15:58:48.604+07	2570	1
f108d67c-7ac4-45aa-93db-c0946eb89872	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๓	สามเณร	กันตพงศ์	เรดี	ม.1/1	1	ชาย	ACTIVE	2026-10-13 11:09:52.792+07	2026-10-13 11:09:52.792+07	2569	1
c2dcc219-51d1-4b20-b10d-0808db77d4a3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๔	สามเณร	กิตติศักดิ์	ใยพัน	ม.1/1	2	ชาย	ACTIVE	2026-10-13 11:09:53.32+07	2026-10-13 11:09:53.32+07	2569	1
af8b5452-6c59-4cd3-b18c-911deb15959d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๕	สามเณร	เข็มทิศ	พุทธสอน	ม.1/1	3	ชาย	ACTIVE	2026-10-13 11:09:53.327+07	2026-10-13 11:09:53.327+07	2569	1
6d0bc46c-4709-4c29-bc93-32dc2b59d299	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๖	สามเณร	ณัฐวุฒิ	พูลสม	ม.1/1	4	ชาย	ACTIVE	2026-10-13 11:09:53.335+07	2026-10-13 11:09:53.335+07	2569	1
ffc5cf5a-5086-4341-81e5-11634bdde855	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๗	สามเณร	ณัฐสิษฐ์	จันดาชัยอนันต์	ม.1/1	5	ชาย	ACTIVE	2026-10-13 11:09:53.341+07	2026-10-13 11:09:53.341+07	2569	1
91d6e928-54df-48b2-b507-9d9b59a6409a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๘	สามเณร	ตะวัน	ฮุยเสนา	ม.1/1	6	ชาย	ACTIVE	2026-10-13 11:09:53.349+07	2026-10-13 11:09:53.349+07	2569	1
83f55947-d781-48ad-88ed-b85c74b82396	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๙	สามเณร	ทศพร	ทองมี	ม.1/1	7	ชาย	ACTIVE	2026-10-13 11:09:53.356+07	2026-10-13 11:09:53.356+07	2569	1
10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๐	สามเณร	ธนเดช	อภัยพิม	ม.1/1	8	ชาย	ACTIVE	2026-10-13 11:09:53.363+07	2026-10-13 11:09:53.363+07	2569	1
64ea5ccc-516f-4bcf-be56-c53b00311e0b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๑	สามเณร	นะโม	นาสีดา	ม.1/1	9	ชาย	ACTIVE	2026-10-13 11:09:53.37+07	2026-10-13 11:09:53.37+07	2569	1
b6d32800-52d3-4fc4-a452-169086fe3ea8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๒	สามเณร	ปิยะ	จันล้วน	ม.1/1	10	ชาย	ACTIVE	2026-10-13 11:09:53.376+07	2026-10-13 11:09:53.376+07	2569	1
a93bc421-5ea8-47e4-b886-bc8e5266fde3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๓	สามเณร	พรพิพัฒน์	พลมาตย์	ม.1/1	11	ชาย	ACTIVE	2026-10-13 11:09:53.383+07	2026-10-13 11:09:53.383+07	2569	1
20842ac0-2da2-46a3-9412-f81b587ab762	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๔	สามเณร	พีรพล	พงศ์ร่วมมิตร	ม.1/1	12	ชาย	ACTIVE	2026-10-13 11:09:53.389+07	2026-10-13 11:09:53.389+07	2569	1
28aa324e-d56b-42d7-9cc6-7d83eac27515	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๕	สามเณร	พุทธภูมิ	บุญจอม	ม.1/1	13	ชาย	ACTIVE	2026-10-13 11:09:53.397+07	2026-10-13 11:09:53.397+07	2569	1
2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๖	สามเณร	ภูผา	รุ่งเรือง	ม.1/1	14	ชาย	ACTIVE	2026-10-13 11:09:53.404+07	2026-10-13 11:09:53.404+07	2569	1
3a9f315e-82e1-4f05-a124-2eb8748a28b9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๗	สามเณร	วศิน	อินเลี้ยง	ม.1/1	15	ชาย	ACTIVE	2026-10-13 11:09:53.41+07	2026-10-13 11:09:53.41+07	2569	1
a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๘	สามเณร	ศักดา	วาลา	ม.1/1	16	ชาย	ACTIVE	2026-10-13 11:09:53.417+07	2026-10-13 11:09:53.417+07	2569	1
e5d6702e-7195-4e52-91ff-44d9ce67b414	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๙	สามเณร	ศิวกร	วงษาภา	ม.1/1	17	ชาย	ACTIVE	2026-10-13 11:09:53.423+07	2026-10-13 11:09:53.423+07	2569	1
82642422-0fb8-47ff-b6aa-82b60a2536bb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14681006	สามเณร	ชโยดม	ม่วงพูลสวาสดิ์	ม.1/1	18	ชาย	ACTIVE	2026-10-13 11:09:53.431+07	2026-10-13 11:09:53.431+07	2569	1
83c427cd-538d-4483-9f26-0409efda2abb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14681008	สามเณร	ณัฐศาสตร์	เก่งการรบ	ม.1/1	19	ชาย	ACTIVE	2026-10-13 11:09:53.437+07	2026-10-13 11:09:53.437+07	2569	1
14c9c5ab-22a8-4ee5-86a0-4e6fdf90b978	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671011	สามเณร	ภัคพงษ์	พันธุมา	ม.2	6	ชาย	ACTIVE	2026-10-13 11:19:42.613+07	2026-10-13 11:19:42.613+07	2569	1
0dd6e650-e0df-4aef-9607-7634123f6c07	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671012	สามเณร	ภคนันท์	ปาฮาดไชย	ม.2	7	ชาย	ACTIVE	2026-10-13 11:19:42.629+07	2026-10-13 11:19:42.629+07	2569	1
334f8e7f-8b0f-464d-b56c-a5653b8f8fd9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671013	สามเณร	ธนพล	บุญยรัตพันธุ์	ม.2	8	ชาย	ACTIVE	2026-10-13 11:19:42.657+07	2026-10-13 11:19:42.657+07	2569	1
3699340a-1b7a-4de8-934b-dc1962c80943	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671007	สามเณร	เจตริน	สิ้นโศรก	ม.4	2	ชาย	ACTIVE	2026-10-13 11:19:42.585+07	2026-10-13 11:41:50.831+07	2569	2
c55ae954-20bf-4638-b457-64ef0c5aeddb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671008	สามเณร	ณัฐพล	โสมงาม	ม.4	3	ชาย	ACTIVE	2026-10-13 11:19:42.592+07	2026-10-13 11:42:48.04+07	2569	2
091ec7fa-05d9-488c-95e0-52f5abce9d89	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671009	สามเณร	เดชาพล	เทพกูล	ม.4	4	ชาย	ACTIVE	2026-10-13 11:19:42.599+07	2026-10-13 11:42:55.186+07	2569	2
543b6a96-8fb4-4430-aef2-06f6e964a614	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671010	สามเณร	สิวะกร	เทพกูล	ม.4	5	ชาย	ACTIVE	2026-10-13 11:19:42.607+07	2026-10-13 11:43:02.531+07	2569	2
bbb6056c-d1f4-49c4-82f0-f2e58786b450	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671014	สามเณร	วงศธร	พจนวัฒนะพันธุ์	ม.2	9	ชาย	ACTIVE	2026-10-13 11:19:42.673+07	2026-10-13 11:19:42.673+07	2569	1
4d8e6441-fd3e-42a7-bcab-0ee1e4cc3d17	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671016	สามเณร	กิตติศักดิ์	เครือแก้ว	ม.2	10	ชาย	ACTIVE	2026-10-13 11:19:42.71+07	2026-10-13 11:19:42.71+07	2569	1
a21827fb-c9b6-44ec-aaaf-2b30d5009fb5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671017	สามเณร	ธีรภัทร	สิงหะรา	ม.2	11	ชาย	ACTIVE	2026-10-13 11:19:42.72+07	2026-10-13 11:19:42.72+07	2569	1
b92b6e51-666e-47af-9e05-a5fdf1d8c39f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671020	สามเณร	ณัฐพงษ์	เมืองลอง	ม.2	12	ชาย	ACTIVE	2026-10-13 11:19:42.729+07	2026-10-13 11:19:42.729+07	2569	1
c76b0ebd-8886-4811-99df-5dfdd8408513	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671021	สามเณร	พีรพัฒน์	เล็กรังสรรค์	ม.2	13	ชาย	ACTIVE	2026-10-13 11:19:42.737+07	2026-10-13 11:19:42.737+07	2569	1
89e628a6-be7e-4c24-b6a2-37a398afa26a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671022	สามเณร	เกียรติชัย	พิมมิวาส	ม.2	14	ชาย	ACTIVE	2026-10-13 11:19:42.743+07	2026-10-13 11:19:42.743+07	2569	1
f443f4e8-c995-4c7c-95f1-64ba59a97ce0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671024	สามเณร	ศุภชัย	มุละสิวะ	ม.2	15	ชาย	ACTIVE	2026-10-13 11:19:42.75+07	2026-10-13 11:19:42.75+07	2569	1
50b83977-8822-4bf5-8268-a07327d457bc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671031	สามเณร	รุ่งภพ	สุวรรณะ	ม.2	16	ชาย	ACTIVE	2026-10-13 11:19:42.756+07	2026-10-13 11:19:42.756+07	2569	1
f0b3ce2b-06aa-4161-a04c-f67181d193cd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671032	สามเณร	วชร	สาธรราษฎร์	ม.2	17	ชาย	ACTIVE	2026-10-13 11:19:42.761+07	2026-10-13 11:19:42.761+07	2569	1
2ecc75dd-898d-416b-8fd8-745c3a9fed39	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671034	สามเณร	สุธิชัย	พลแสน	ม.2	18	ชาย	ACTIVE	2026-10-13 11:19:42.77+07	2026-10-13 11:19:42.77+07	2569	1
cfa9455c-396e-4359-8072-423a053e6b78	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671035	สามเณร	พัทสกร	พิลาหา	ม.2	19	ชาย	ACTIVE	2026-10-13 11:19:42.776+07	2026-10-13 11:19:42.776+07	2569	1
02839ae1-9cd7-4d8d-94bc-52a64629bfdc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671036	สามเณร	นิธิทัต	ธรรมพร	ม.2	20	ชาย	ACTIVE	2026-10-13 11:19:42.784+07	2026-10-13 11:19:42.784+07	2569	1
0817b36c-ceb5-49f6-a68b-13e030372f3e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671038	สามเณร	ณัฏฐกร	เม่นทอง	ม.2	21	ชาย	ACTIVE	2026-10-13 11:19:42.789+07	2026-10-13 11:19:42.789+07	2569	1
42b4182c-75bd-426e-87bc-4c7429e98c6b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671039	สามเณร	วิทย์	ไวนุขันธ์	ม.2	22	ชาย	ACTIVE	2026-10-13 11:19:42.795+07	2026-10-13 11:19:42.795+07	2569	1
620a46f1-a53a-4d90-81b8-6329369bce1f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671040	สามเณร	ติณณภพ	ภูถมดี	ม.2	23	ชาย	ACTIVE	2026-10-13 11:19:42.802+07	2026-10-13 11:19:42.802+07	2569	1
b3730163-3b83-42f2-9fdf-ee4c8dfd751e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671041	สามเณร	ศรัณย์	ยุระพันธ์	ม.2	24	ชาย	ACTIVE	2026-10-13 11:19:42.809+07	2026-10-13 11:19:42.809+07	2569	1
5aea9db4-6b11-4446-aded-c617ad5ab447	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671045	สามเณร	อัมรินทร์	ภูผา	ม.2	25	ชาย	ACTIVE	2026-10-13 11:19:42.816+07	2026-10-13 11:19:42.816+07	2569	1
6ea75217-8bad-48cc-9545-e02411e9cda2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๑	สามเณร	ศุภกิตติ์	คงแรต	ม.2	26	ชาย	ACTIVE	2026-10-13 11:19:42.823+07	2026-10-13 11:19:42.823+07	2569	1
b38196d9-d82c-4ba5-86b3-2874babba24f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671006	สามเณร	เกรียงไกร	ไกรเพ็ชร	ม.4	1	ชาย	ACTIVE	2026-10-13 11:19:42.57+07	2026-10-13 11:42:13.015+07	2569	2
\.


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tenants (id, code, name_th, name_en, logo_url, settings, is_active, created_at, updated_at) FROM stdin;
f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	DEMO	โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย	SATIT MCU	/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg	{"smtp": {"from": "SATIT MCU System <hero2027@gmail.com>", "host": "smtp.gmail.com", "pass": "bqnm vzzy mpjg cmss", "port": 465, "user": "hero2027@gmail.com", "secure": true}, "palette": "pink", "executives": [{"id": "exec-1", "email": "board@satitmcu.ac.th", "phone": "035-248-000 ต่อ 8100", "prefix": "พระธรรมวชิรปัญญาภรณ์", "message": "มุ่งหวังให้โรงเรียนสาธิต มจร เป็นแหล่งบ่มเพาะปัญญาและคุณธรรม สร้างเยาวชนที่มีจิตสาธารณะ มีคุณธรรม และมีความรู้ความสามารถระดับสากล", "imageUrl": null, "isActive": true, "lastName": "สุรเตโช", "position": "ประธานคณะกรรมการสถานศึกษาขั้นพื้นฐาน", "createdAt": "2026-10-14T07:16:17.650Z", "firstName": "ทองดี", "updatedAt": "2026-10-14T07:16:17.650Z", "department": "คณะกรรมการสถานศึกษา", "academicRank": "ศ., ดร., ป.ธ.๙", "displayOrder": 1}, {"id": "exec-2", "email": "director@satitmcu.ac.th", "phone": "035-248-000 ต่อ 8101", "prefix": "รศ.ดร.", "message": "เรามุ่งเน้นการศึกษาที่มีคุณภาพสูง ผสานเทคโนโลยีและวิถีพุทธ เพื่อพัฒนาเยาวชนให้เติบโตอย่างสมดุลทั้งกาย จิตใจ สติปัญญา และสังคม", "imageUrl": null, "isActive": true, "lastName": "ปัญญาดี", "position": "ผู้อำนวยการโรงเรียนสาธิต มจร", "createdAt": "2026-10-14T07:16:17.650Z", "firstName": "สมศักดิ์", "updatedAt": "2026-10-14T07:16:17.650Z", "department": "สำนักงานผู้อำนวยการ", "academicRank": "ปร.ด. การบริหารการศึกษา", "displayOrder": 2}, {"id": "exec-3", "email": "academic@satitmcu.ac.th", "phone": "035-248-000 ต่อ 8102", "prefix": "อาจารย์", "message": "ยกระดับมาตรฐานหลักสูตรสู่ความเป็นเลิศ พัฒนาสื่อและนวัตกรรม พร้อมด้วยการวัดและประเมินผลตามสภาพจริง", "imageUrl": "/uploads/3c1e4a7d-7849-48ec-87a9-db9becbc48c2.jpg", "isActive": true, "lastName": "วงศ์เมืองแก่น", "position": "รองผู้อำนวยการฝ่ายวิชาการและวิจัย", "createdAt": "2026-10-14T07:16:17.650Z", "firstName": "นิโรจน์", "updatedAt": "2026-10-14T07:16:17.650Z", "department": "ฝ่ายวิชาการ", "academicRank": "กศ.ม. การศึกษาและการวิจัย", "displayOrder": 3}, {"id": "exec-4", "email": "studentaffairs@satitmcu.ac.th", "phone": "035-248-000 ต่อ 8103", "prefix": "พระมหา", "message": "ส่งเสริมระเบียบวินัย คุณธรรม จริยธรรม กิจกรรมสร้างสรรค์ และสุขภาวะที่ดีของนักเรียนทุกคน", "imageUrl": null, "isActive": true, "lastName": "เขมธโร", "position": "รองผู้อำนวยการฝ่ายกิจการนักเรียนและคุณธรรม", "createdAt": "2026-10-14T07:16:17.650Z", "firstName": "บุญเลิศ", "updatedAt": "2026-10-14T07:16:17.650Z", "department": "ฝ่ายกิจการนักเรียน", "academicRank": "พธ.บ., ป.ธ.๗", "displayOrder": 4}], "schoolInfo": {"fax": "035-248-001", "line": "@satitmcu", "email": "satit_mcu@mcu.ac.th", "motto": "ปญฺญา โลกสฺมิ ปชฺโชโต (ปัญญาเป็นแสงสว่างในโลก)", "phone": "091-860-585-4", "mapUrl": "https://maps.app.goo.gl/1V2qzZTyj8FQV3xA9", "nameEn": "SATIT MCU", "nameTh": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "vision": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย มุ่งมั่นจัดการศึกษาขั้นพื้นฐานตามมาตรฐานสากล บนพื้นฐานอัตลักษณ์วิถีพุทธ พัฒนาผู้เรียนให้มีความเป็นเลิศทางวิชาการ มีคุณธรรม จริยธรรม และมีทักษะศตวรรษที่ 21 เพื่อก้าวสู่ความเป็นพลเมืองโลก", "address": "ตึก มจร วัดมหาธาตุยุวราชรังสฤษฎิ์ราชวรมหาวิหาร 3 ถนน ท่าพระจันทร์ – วังหลัง แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพมหานคร 10200", "gallery": [{"id": "gal-1", "url": "https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/734094386_1592906822846014_4365439002370792525_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1367&ctp=s2048x1367&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFwfofs26EPDEFWtvQQj6wxOcdkDl2Y--Q5x2QOXZj75ILvFxp9pY0kUE3e25iIzsw&_nc_ohc=PkLBES24yvEQ7kNvwHzftoi&_nc_oc=Ado3tPzTaOrViIumf-9avCdGErWtPSgSFO4mZ6J9z8_Dm3RSTAkRkAvMLfXf_xXhwosZo6cHqkgH_dJP8zyjw3J_&_nc_zt=23&_nc_ht=scontent.fbkk2-7.fna&_nc_gid=xIW3M8ieJQ2GVAwiFUrTGA&_nc_ss=7b2a8&oh=00_AQNA90rViImhwqtVZtMbRbmABiFImF0t15BYy1ZQYApuDg&oe=6AD56925", "title": "ทัศนียภาพอาคารเรียนและบริเวณโรงเรียนสาธิต มจร", "createdAt": "2026-10-14T07:30:01.645Z", "description": "สภาพแวดล้อมที่ร่มรื่น สะอาด ปลอดภัย เอื้อต่อการเรียนรู้และการพัฒนาทักษะของผู้เรียน"}, {"id": "gal-2", "url": "https://scontent.fbkk2-8.fna.fbcdn.net/v/t39.30808-6/752699235_1612461634223866_8587772214290393956_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s2048x1365&_nc_cat=101&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEpDqeeGLLI_I_rPionDPCjvM70Vqc4yki8zvRWpzjKSLvKafri5ZVca6ZpXyPFm_8&_nc_ohc=d9EqW0C4zr0Q7kNvwF9E2Lz&_nc_oc=AdqYNZE4bckEI3Y7F7FbPI2iVVZg0otqRoR_N7kg9ne7acn2HuKIH9rclt4cU20MAVp14DnuvSEyYvbSnEGZ8B54&_nc_zt=23&_nc_ht=scontent.fbkk2-8.fna&_nc_gid=kpEwe1gS4mHq35w-m66j9g&_nc_ss=7b2a8&oh=00_AQP9nQt_4l265pwZtqti7WwpLZs9IS6Zup00afmYWDihsQ&oe=6AD5688B", "title": "กิจกรรมเสริมสร้างคุณธรรมและวิถีชาวพุทธ", "createdAt": "2026-10-14T07:30:01.645Z", "description": "การฝึกอบรมสมาธิ ภาวนา และการเรียนรู้หลักพุทธศาสนาบูรณาการในการดำเนินชีวิต"}], "history": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ก่อตั้งขึ้นภายใต้ความอุปถัมภ์ของมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย เพื่อเป็นสถานศึกษาต้นแบบในการจัดการศึกษาขั้นพื้นฐานที่มีคุณภาพระดับมาตรฐานสากล โดยมุ่งเน้นการบูรณาการองค์ความรู้ทางวิชาการสมัยใหม่เข้ากับคุณธรรม จริยธรรม และวิถีชาวพุทธ จัดการเรียนการสอนตั้งแต่ระดับมัธยมศึกษาตอนต้นถึงมัธยมศึกษาตอนปลาย เพื่อสร้างเยาวชนที่มีศักยภาพสูง มีความเป็นผู้นำ และมีจิตสาธารณะต่อสังคม", "logoUrl": "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg", "mission": ["ส่งเสริมและพัฒนาการจัดการเรียนรู้ที่เน้นผู้เรียนเป็นสำคัญ สอดคล้องกับหลักสูตรสถานศึกษาและทักษะแห่งอนาคต", "ปลูกฝังคุณธรรม จริยธรรม ตามหลักพุทธศาสนาและวิถีวัฒนธรรมไทยให้เป็นคนดีมีปัญญา", "พัฒนาระบบบริหารจัดการสถานศึกษาด้วยเทคโนโลยีดิจิทัลและสารสนเทศที่ทันสมัยอย่างมีประสิทธิภาพ", "ส่งเสริมความเป็นเลิศด้านภาษาไทย ภาษาบาลี และภาษาต่างประเทศเพื่อการสื่อสารระดับสากล", "สร้างเครือข่ายความร่วมมือทางการศึกษาระหว่างบ้าน วัด โรงเรียน มหาวิทยาลัย และองค์กรภายนอก"], "website": "https://satit.mcu.ac.th", "facebook": "https://www.facebook.com/SatitMahachula", "identity": "คุณธรรมเด่น เน้นภาษา ก้าวหน้าเทคโนโลยี", "shortName": "สาธิต มจร / SATIT MCU", "philosophy": "คุณธรรมนำความรู้ มุ่งสู่ความเป็นเลิศ เชิดชูความเป็นไทย ใส่ใจสากล", "treeFlower": "ต้นไม้ประจำมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร) คือ ต้นอโศก ซึ่งมีดอกสีแดงสด", "uniqueness": "วิถีพุทธ วิถีเรียนรู้ คู่คุณธรรม", "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3944151152177!2d100.48978989999999!3d13.755072400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2990016d91d3d%3A0xe20caf578932a06d!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZ4Liq4Liy4LiY4Li04LiV4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lih4Lir4Liy4LiI4Li44Lis4Liy4Lil4LiH4LiB4Lij4LiT4Lij4Liy4LiK4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii!5e0!3m2!1sth!2sth!4v1791967187909!5m2!1sth!2sth", "schoolColors": " เป็นสีประจำวันพระราชสมภพ (วันอังคาร) ของพระบาทสมเด็จพระจุลจอมเกล้าเจ้าอยู่หัว (รัชกาลที่ 5) ซึ่งทรงสถาปนามหาวิทยาลัยขึ้นในปี พ.ศ. 2430 ในนามของ \\"มหาจุฬาลงกรณราชวิทยาลัย\\"", "coverImageUrl": "/uploads/cfd0ca66-3918-4fd8-aeaf-73bc0a81479a.jpg", "showMapWidget": true, "facebookPageUrl": "https://www.facebook.com/SatitMahachula", "mapCustomHeight": 450, "mapDisplayHeight": "compact", "showFacebookWidget": true, "facebookCustomHeight": 450, "facebookDisplayHeight": "tall"}, "geminiApiKey": "", "heroSettings": {"slides": [{"id": "slide-1", "title": "ยินดีต้อนรับสู่ โรงเรียนสาธิต มจร", "imageUrl": "https://scontent.fbkk2-8.fna.fbcdn.net/v/t39.30808-6/489765384_1181073850695982_5971361311609765303_n.jpg?stp=dst-jpg_tt6&cstp=mx1904x861&ctp=s1904x861&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeG91uyvacmppb6dodQrgdFAwznttQzJJT_DOe21DMklP72DdB-YzmLhz51XqYSETYk&_nc_ohc=HOLEUHsF4LcQ7kNvwEJtTR8&_nc_oc=Adq6RT2uxNeIP1Z7oMccctq_v5RTnOHyXsVrb-fUIpYHeJI6tdABSVgCLucEco-RQkekoAuM-VYCWz_BWs0Gc-Vx&_nc_zt=23&_nc_ht=scontent.fbkk2-8.fna&_nc_gid=1Xm68wyJtH2ITIY-mT_ajA&_nc_ss=7b2a8&oh=00_AQOjsZla3tLuves0s-5cb4jzFMqoQWv6Mk-zMMZFYDbYzg&oe=6AD5540C", "isActive": true, "subtitle": "มุ่งมั่นพัฒนาวิชาการ ปลูกฝังคุณธรรม ก้าวทันเทคโนโลยีดิจิทัลสู่สากล", "buttonUrl": "", "buttonText": "", "displayOrder": 1}, {"id": "slide-2", "title": "“ปญฺญา โลกสฺมิ ปชฺโชโต (ปัญญาเป็นแสงสว่างในโลก)”", "imageUrl": "https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/753668460_1614218180714878_8758497212915786179_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s2048x1365&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE-R6qWyfyVwqb0_seJlcHUsU_9v4OQmqaxT_2_g5CapurHpqXxDtf3QxbajlgTSvk&_nc_ohc=CNkHQVjeS3kQ7kNvwGLfqzD&_nc_oc=AdojNbMRjExX2JWMMMQ9Qao2sTa9PzgdMyBMBjq4zP7Z6Gqrf3XvjYSRIJBE8GTczA12i4Ip6e5rtL8daIuKf-ZK&_nc_zt=23&_nc_ht=scontent.fbkk2-7.fna&_nc_gid=U90aNHwol1cXHu_-l_e_Mw&_nc_ss=7b2a8&oh=00_AQN6qgoOM9H7aqppQQs4FYiRLNeKoj-FBelgk4CaMErgog&oe=6AD562D8", "isActive": true, "subtitle": "คุณธรรมนำความรู้ มุ่งสู่ความเป็นเลิศ เชิดชูความเป็นไทย ใส่ใจสากล", "buttonUrl": "", "buttonText": "", "displayOrder": 2}, {"id": "slide-3", "title": "คุณธรรมเด่น เน้นภาษา ก้าวหน้าเทคโนโลยี", "imageUrl": "https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/733890456_1592905682846128_4424459320880923145_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1367&ctp=s2048x1367&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGJg5oppvLaOB1qOJoxyLrZzKX1U-zs0ifMpfVT7OzSJ6aRnn0DWQZhdsFknN_vj80&_nc_ohc=azJTp3b2AgsQ7kNvwEzxLCr&_nc_oc=AdqHtl7o_2wKd8MzmSBKLLVmHCXt9uQ57wkhbjnnulx6hDmz9JuAMfJkTp2KLaQY0JaVX41JQ4UoiuNBmSdPw8u7&_nc_zt=23&_nc_ht=scontent.fbkk2-7.fna&_nc_gid=60aahH-F83uKGgcVjntBRA&_nc_ss=7b2a8&oh=00_AQOwNUAtisBTiYbriRTksT74r001lp7iDLjAe5mownuO6A&oe=6AD57A54", "isActive": true, "subtitle": "มีความเป็นเลิศทางวิชาการ มีคุณธรรม จริยธรรม และมีทักษะศตวรรษที่ 21", "buttonUrl": "", "buttonText": "", "displayOrder": 3}], "coinSpeed": 1, "videoBgUrl": "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4", "description": "ศูนย์กลางบริการการศึกษาและบริหารงานโรงเรียนยุคใหม่ ครอบคลุมระบบข่าวสาร จัดการหลักสูตร ทำเนียบคณาจารย์ ระบบสารสนเทศงานทะเบียนและวัดผล และศูนย์ดาวน์โหลด", "displayMode": "slideshow", "show3DCoins": false, "showVideoBg": false, "eyebrowBadge": "SMART WEB PLATFORM • SATIT MCU", "headlinePart1": "พัฒนาปัญญา สร้างสรรค์วิชาการ", "headlinePart2": "สู่นวัตกรรมการศึกษาและบริหารจัดการที่ทันสมัย", "showParticles": false, "slideInterval": 3, "slideAnimation": "kenburns", "showDescription": false, "slideBrightness": "bright", "primaryButtonUrl": "https://www.facebook.com/SatitMahachula", "showEyebrowBadge": true, "primaryButtonText": "Facebook", "showHeadlinePart1": false, "showHeadlinePart2": false, "showPrimaryButton": false, "secondaryButtonUrl": "#news", "secondaryButtonText": "ข่าวประชาสัมพันธ์", "showSecondaryButton": false}, "footerSettings": {"contact": {"email": "อีเมล: satit_mcu@mcu.ac.th", "phone": "โทรศัพท์: 091-860-585-4", "title": "ติดต่อ & สถานที่ตั้ง", "mapUrl": "https://maps.app.goo.gl/1V2qzZTyj8FQV3xA9", "address": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ตึก มจร วัดมหาธาตุยุวราชรังสฤษฎิ์ราชวรมหาวิหาร 3 ถนน ท่าพระจันทร์ – วังหลัง แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพมหานคร 10200", "showMapLink": true, "operatingHours": "เวลาทำการ: จันทร์ - ศุกร์ 12:30 - 18:30 น."}, "services": [{"id": "srv-1", "url": "#news", "label": "ข่าวสารประชาสัมพันธ์", "iconName": "Newspaper", "isActive": true, "displayOrder": 1, "openInNewTab": false}, {"id": "srv-2", "url": "#personnel", "label": "ทำเนียบคณาจารย์และบุคลากร", "iconName": "Users", "isActive": true, "displayOrder": 2, "openInNewTab": false}, {"id": "srv-3", "url": "#curriculum", "label": "โครงสร้างหลักสูตรการศึกษา", "iconName": "BookOpen", "isActive": true, "displayOrder": 3, "openInNewTab": false}, {"id": "srv-4", "url": "#services", "label": "สารสนเทศ (ทะเบียนและดาวน์โหลด)", "iconName": "FileText", "isActive": true, "displayOrder": 4, "openInNewTab": false}, {"id": "srv-1791972672637", "url": "https://www.mcu.ac.th/", "label": "MCU มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "iconName": "Globe", "isActive": true, "displayOrder": 5, "openInNewTab": false}], "staffLinks": [{"id": "stf-1", "url": "/login", "badge": "", "label": "เข้าสู่ระบบเจ้าหน้าที่", "isActive": true, "isButton": true, "displayOrder": 1, "openInNewTab": false}], "staffTitle": "สำหรับเจ้าหน้าที่", "themeColor": "pink", "socialLinks": {"lineUrl": "https://line.me", "youtubeUrl": "https://www.youtube.com/@mcudofficial6422", "facebookUrl": "https://www.facebook.com/SatitMahachula", "showSocials": true}, "visitorStats": {"title": "สถิติผู้เข้าชมเว็บไซต์", "enabled": true, "todayCount": 193, "totalCount": 45863, "onlineCount": 10, "autoTracking": true, "lastActiveDate": "2026-10-14"}, "copyrightText": "© 2026 SATIT MCU System. All rights reserved.", "servicesTitle": "ระบบงานบริการหลัก", "showBackToTop": true, "backgroundTheme": "warm", "brandDescription": "มุ่งมั่นจัดการศึกษาขั้นพื้นฐานตามมาตรฐานสากล บนพื้นฐานอัตลักษณ์ความเป็นไทยและคุณธรรมทางพระพุทธศาสนา ก้าวล้ำด้วยนวัตกรรมดิจิทัลเพื่อการเรียนรู้และการบริหารจัดการยุคใหม่", "copyrightSubtext": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "showSystemStatus": false, "smartCampusBadge": "Smart Campus", "systemStatusText": "ระบบบริการออนไลน์พร้อมใช้งาน (All Systems Operational)", "showSmartCampusBadge": false}}	t	2026-09-11 03:08:14.731+07	2026-10-14 14:44:14.599+07
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
e665ca42-7399-4354-bb6b-f9b75deb9829	admin@app.local	$2b$12$JvCtZTYa583tFb97mNUv8Oqlfgg4M8.8z1LsnaeLiuNP9eu2.Udre	ผู้ดูแลสูงสุด (Admin)	\N	credentials	\N	t	t	f	th	2026-10-14 14:35:36.737+07	2026-09-11 03:08:15.394+07	2026-10-14 14:35:36.745+07
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
-- Name: courses_instructor_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX courses_instructor_id_idx ON public.courses USING btree (instructor_id);


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
-- Name: students_academic_year_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX students_academic_year_idx ON public.students USING btree (academic_year);


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
-- Name: courses courses_instructor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_instructor_id_fkey FOREIGN KEY (instructor_id) REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE SET NULL;


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

\unrestrict B5M1MYFBtg4cn4SFIXrzA5Y7eHJbu2wPQ9AlQTDj2gKb51e4rUcHLmDKDCupe1U

