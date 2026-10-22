--
-- PostgreSQL database dump
--

\restrict xWGbKhLVHq3peeGQQoeVCQVCFrI1uSgzMuxOBkg3htIsRdfE7uX6euBn2Z9tziC

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
DROP INDEX IF EXISTS public.students_tenant_id_student_code_academic_year_semester_key;
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
DROP INDEX IF EXISTS public.courses_curriculum_id_course_code_academic_year_semester_key;
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
    subject_group character varying(255),
    academic_year character varying(10) DEFAULT '2569'::character varying,
    target_grade character varying(20)
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
    image_url text,
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
    pdf_url text,
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
    image_url text,
    display_order integer DEFAULT 0 NOT NULL
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
    image_url text
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
    logo_url text,
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
    image_url text,
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
a4105665-0476-4aa4-8019-bee26c737231	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	ABSENT	\N	2026-10-15 13:52:19.247+07	2026-10-15 13:52:19.247+07
e081159e-732a-4678-8d59-a0d5c447067a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:19.269+07	2026-10-15 13:52:19.269+07
794511a1-0bd7-40be-a821-aefb545145d8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:19.273+07	2026-10-15 13:52:19.273+07
582d4502-5efe-47b8-83a0-91bd8c444bb8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:19.276+07	2026-10-15 13:52:19.276+07
49bb2955-3c2b-42d3-9e02-0580ecb90123	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:19.279+07	2026-10-15 13:52:19.279+07
b3b8928e-d893-45e6-9462-607507870147	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:19.282+07	2026-10-15 13:52:19.282+07
90d7fad3-51df-41d3-8e7a-315ee4374a62	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:19.284+07	2026-10-15 13:52:19.284+07
bbf444f3-8c03-4fb3-9272-4bdddfc0184a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.108+07	2026-10-09 12:01:58.108+07
f8054e85-a4e3-4c21-a236-ebc201fd5843	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.112+07	2026-10-09 12:01:58.112+07
70f9819a-8e04-4468-b646-9995b762ae69	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-21	1	PRESENT	\N	2026-10-09 12:01:58.115+07	2026-10-09 12:01:58.115+07
3a9dc4a1-03ff-4b42-a8ca-f88343b708f8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:19.287+07	2026-10-15 13:52:19.287+07
24bee06a-1bfa-4918-9433-b4f5656f538d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	ABSENT	\N	2026-10-15 13:52:19.291+07	2026-10-15 13:52:19.291+07
d679f80a-55b0-4f73-9279-e5957a3e1f2c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:19.294+07	2026-10-15 13:52:19.294+07
db473a26-88eb-4041-abeb-44fad03d87b7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	ABSENT	\N	2026-10-15 13:52:19.297+07	2026-10-15 13:52:19.297+07
97825a34-531e-4561-acb5-b16c5345652c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:19.299+07	2026-10-15 13:52:19.299+07
e434871b-1237-4549-a229-c82fd43c285b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:19.301+07	2026-10-15 13:52:19.301+07
000c6489-c1ce-4fd7-b127-0a6ffa6313fe	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:19.304+07	2026-10-15 13:52:19.304+07
14a8c9b9-4034-49c7-a5cc-086de0effd7e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.143+07	2026-10-09 12:01:58.143+07
0f2ac5ec-17dc-4a33-bd68-cd02f7434c96	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.146+07	2026-10-09 12:01:58.146+07
9bfef093-485c-482b-9f9d-c778244aa450	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-24	1	PRESENT	\N	2026-10-09 12:01:58.15+07	2026-10-09 12:01:58.15+07
4cf1d291-c5c4-4b03-a34f-cd71e12e4cc7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	ABSENT	\N	2026-10-15 13:52:19.308+07	2026-10-15 13:52:19.308+07
d865e330-9635-46ff-bebd-17ddd8f1c661	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	ABSENT	\N	2026-10-15 13:52:19.311+07	2026-10-15 13:52:19.311+07
c6c6abb9-3909-4b3e-bd2e-72691cdd07af	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	ABSENT	\N	2026-10-15 13:52:19.313+07	2026-10-15 13:52:19.313+07
1ba0891d-1bd2-422c-823b-8f631fbfaf10	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	ABSENT	\N	2026-10-15 13:52:19.315+07	2026-10-15 13:52:19.315+07
6f786ec9-3749-4d52-b00f-953697d124b7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	ABSENT	\N	2026-10-15 13:52:19.318+07	2026-10-15 13:52:19.318+07
b3252b3a-d2ce-487d-b466-7336b30e3670	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	ABSENT	\N	2026-10-15 13:52:19.322+07	2026-10-15 13:52:19.322+07
d715eba8-9ad5-4258-a8a4-e5e7c3b6b9d6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	ABSENT	\N	2026-10-15 13:52:19.325+07	2026-10-15 13:52:19.325+07
69f27729-b79b-4e79-a4ee-ade8aeb507b1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.176+07	2026-10-09 12:01:58.176+07
89cbab2c-e7cc-47dc-97cb-f6ddce43907e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-27	1	LATE	\N	2026-10-09 12:01:58.178+07	2026-10-09 12:01:58.178+07
d991a2b4-0ebb-4ec4-8c3e-4e6439f9d93a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-27	1	PRESENT	\N	2026-10-09 12:01:58.181+07	2026-10-09 12:01:58.181+07
c5ee09c2-b0f0-4199-a502-dfd3a5d36820	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:19.328+07	2026-10-15 13:52:19.328+07
2e3dd2f3-51cb-4b63-be52-496666a9f286	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	ABSENT	\N	2026-10-15 13:52:19.331+07	2026-10-15 13:52:19.331+07
f3b38e05-68b4-44d3-8437-8171743b5d96	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	ABSENT	\N	2026-10-15 13:52:19.333+07	2026-10-15 13:52:19.333+07
1fc6e084-0a6e-4006-86ec-c5fb7efc2418	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	ABSENT	\N	2026-10-15 13:52:19.336+07	2026-10-15 13:52:19.336+07
afd9dd82-3bd4-495c-a12c-78fd32b59a0f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:19.34+07	2026-10-15 13:52:19.34+07
61490f9c-2a43-40e5-b362-28fdbacceb08	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:19.344+07	2026-10-15 13:52:19.344+07
6a8e22d1-926c-4379-94de-196278af1d2a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:19.347+07	2026-10-15 13:52:19.347+07
c945b703-68a2-4fca-bb3e-34b4f0d8cd52	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.208+07	2026-10-09 12:01:58.208+07
2504411c-1f6a-48a3-846c-dbedcc04af7c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.211+07	2026-10-09 12:01:58.211+07
cbcd8595-e89d-44a4-b4c4-737d0e136478	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-30	1	PRESENT	\N	2026-10-09 12:01:58.215+07	2026-10-09 12:01:58.215+07
b0abe8da-832a-4c06-a3d8-9caec5ae45c1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:19.349+07	2026-10-15 13:52:19.349+07
f159f2ca-c47c-498f-b635-6d3d511874fb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:19.351+07	2026-10-15 13:52:19.351+07
33623c6c-e98e-4f92-9842-a152e95d4e12	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:19.353+07	2026-10-15 13:52:19.353+07
27720c50-0e24-47fd-b84e-aaf17856e728	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:19.358+07	2026-10-15 13:52:19.358+07
501aff56-cf99-47d9-a901-7afded754bd6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:19.36+07	2026-10-15 13:52:19.36+07
20827878-5eb0-479c-95b7-42f9d2f1cbde	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:19.362+07	2026-10-15 13:52:19.362+07
692682e1-cc3f-4424-bf0c-df54d1e60d9a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:19.365+07	2026-10-15 13:52:19.365+07
83701edc-da4a-4424-9d0c-4ce9aa61b78d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.242+07	2026-10-09 12:01:58.242+07
7f93fef3-2e93-4aaa-ab44-bb9978bafa6f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-02	1	PRESENT	\N	2026-10-09 12:01:58.245+07	2026-10-09 12:01:58.245+07
7bfc98f8-e712-4967-abe4-8d504c721e9b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-02	1	LEAVE	\N	2026-10-09 12:01:58.248+07	2026-10-09 12:01:58.248+07
f2e5af8c-c05d-400d-942e-6fd0d686f33f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:19.367+07	2026-10-15 13:52:19.367+07
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
8aa7fa33-566b-4369-8bb3-5ec5960c4f9c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:19.368+07	2026-10-15 13:52:19.368+07
d4fb0206-704c-4c38-99e0-d9d1ee2c75c1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:19.373+07	2026-10-15 13:52:19.373+07
967221b3-420a-4f64-934c-7cfa8729e6b8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:19.376+07	2026-10-15 13:52:19.376+07
ee7eb111-9c0c-4c4b-9e9e-a120996469ec	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:19.379+07	2026-10-15 13:52:19.379+07
8d6641b9-f5e6-4050-9559-642d5b907a6e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:19.381+07	2026-10-15 13:52:19.381+07
c0b99143-925d-41d7-8a93-7afd41e23e1a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:19.383+07	2026-10-15 13:52:19.383+07
03a38c7e-b399-4292-95d7-fbb96abde3d2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:19.385+07	2026-10-15 13:52:19.385+07
ce813e53-69e5-4d14-bc3a-78c11eadb8de	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.308+07	2026-10-09 12:01:58.308+07
d76af95e-20dc-427d-8f32-036e0655b0d5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.312+07	2026-10-09 12:01:58.312+07
cec49123-22cb-4124-aa2a-465520c0f1bd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-08	1	PRESENT	\N	2026-10-09 12:01:58.315+07	2026-10-09 12:01:58.315+07
8ff3cf44-8dbc-4256-8aa9-c04548f8b7c0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:19.388+07	2026-10-15 13:52:19.388+07
ac940bce-6b73-423f-a751-6d9873322072	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:19.391+07	2026-10-15 13:52:19.391+07
f5b3735f-6070-4931-ad17-54e350b0a15a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:19.394+07	2026-10-15 13:52:19.394+07
fb33beb6-689b-4668-a0dd-4a30a9b60fd6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:19.397+07	2026-10-15 13:52:19.397+07
1b90ee7d-b710-456b-b606-9f55bf399e30	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:19.399+07	2026-10-15 13:52:19.399+07
3b90bf0c-21dd-4d64-b598-aced7566f751	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:19.401+07	2026-10-15 13:52:19.401+07
a5e44efe-fa11-4b1f-b49b-5afa1a2b513e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:19.403+07	2026-10-15 13:52:19.403+07
3b05b211-939c-4b7d-b000-117d61ebf74a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.341+07	2026-10-09 12:01:58.341+07
9893217d-04f3-4023-b68a-a67d9341b6ef	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.345+07	2026-10-09 12:01:58.345+07
ba1e892c-2ed2-4618-a8d7-4bae65b4a145	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-11	1	PRESENT	\N	2026-10-09 12:01:58.348+07	2026-10-09 12:01:58.348+07
283ee2e3-4af8-4c53-843f-eb911b6d62b5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:19.408+07	2026-10-15 13:52:19.408+07
866ef2f3-6533-4a5c-8b4a-c2d7a98d850c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:19.411+07	2026-10-15 13:52:19.411+07
9cc2c40e-8b36-4df1-835f-5bb54d808906	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:19.413+07	2026-10-15 13:52:19.413+07
d4c5364b-0b25-4d1c-b7d8-bc8cf0a716e2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:19.415+07	2026-10-15 13:52:19.415+07
7436f441-befd-47c0-b704-63ad81ea8272	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:19.417+07	2026-10-15 13:52:19.417+07
d099e47f-40c5-45b8-96ea-91af93854e0e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:19.419+07	2026-10-15 13:52:19.419+07
e73fcfa4-961b-4af1-8458-bb02ddc1a7f4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:19.424+07	2026-10-15 13:52:19.424+07
35ffc5ad-4c78-4c92-b131-a2364397924f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.376+07	2026-10-09 12:01:58.376+07
b4fe8986-8ac0-4ef4-91c1-caa3978f1349	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.379+07	2026-10-09 12:01:58.379+07
fd1fb1c1-a518-484c-94db-1e865bd9a3aa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-06-14	1	PRESENT	\N	2026-10-09 12:01:58.382+07	2026-10-09 12:01:58.382+07
ef0eef9f-5811-48ce-bd77-6a9238d2ea5c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:19.426+07	2026-10-15 13:52:19.426+07
0dedfc37-6816-4c1d-8644-3a83f70e3add	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:19.429+07	2026-10-15 13:52:19.429+07
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
223d69ee-b480-451b-9dcd-62f22ecbd880	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:19.431+07	2026-10-15 13:52:19.431+07
c22b1c42-dcff-45b3-87b8-b606d8a8719e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:19.433+07	2026-10-15 13:52:19.433+07
e156181e-3a35-4620-910f-4320117f4591	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:19.435+07	2026-10-15 13:52:19.435+07
fce5d897-54aa-439d-ad05-1c04c53c3db0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:19.439+07	2026-10-15 13:52:19.439+07
e8a91387-0c17-40fb-be4b-035668c1dd03	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:19.441+07	2026-10-15 13:52:19.441+07
add2e6f8-69af-447e-9d86-fc079400085a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:19.444+07	2026-10-15 13:52:19.444+07
75191652-6c92-4a74-9ab8-0c73c95047df	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:19.446+07	2026-10-15 13:52:19.446+07
5e6a788f-d0b0-4a6a-8226-359af9c2267c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:19.448+07	2026-10-15 13:52:19.448+07
4b6a99d1-f068-48a9-83f6-d72c2e832bd6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:19.45+07	2026-10-15 13:52:19.45+07
88d7c0fe-e116-4966-a584-a07e4c746290	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:19.452+07	2026-10-15 13:52:19.452+07
0c8d07af-dfa9-4a48-afd3-4cfdfe1aa9af	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:19.456+07	2026-10-15 13:52:19.456+07
468490a3-3b50-4e31-86c5-e50f41ae5e5d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:19.459+07	2026-10-15 13:52:19.459+07
468672d0-8492-4fef-bb1c-27047c06d4f2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:19.461+07	2026-10-15 13:52:19.461+07
570103b7-6e97-4ee5-adb4-7a658fec3317	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:19.464+07	2026-10-15 13:52:19.464+07
032152f0-a93a-44a4-9116-73da82c9702d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:19.465+07	2026-10-15 13:52:19.465+07
8c5cdf86-ee46-4754-b5c7-bce3c7da47f3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:19.467+07	2026-10-15 13:52:19.467+07
eb88b0a8-6cef-443b-a2e1-4b34195e8173	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:19.469+07	2026-10-15 13:52:19.469+07
2bc1c668-762c-43ae-90e6-b85002371921	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:19.474+07	2026-10-15 13:52:19.474+07
7c18658d-f56b-4c85-854a-d6c194fd438a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:19.476+07	2026-10-15 13:52:19.476+07
67e7b262-1346-4b9c-bd54-881bfe440cbf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:19.478+07	2026-10-15 13:52:19.478+07
f1ebd6d7-bc26-4522-b3c5-c81f00153d97	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:19.48+07	2026-10-15 13:52:19.48+07
12411b61-100b-4e99-a2a5-97087904bd5c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:19.482+07	2026-10-15 13:52:19.482+07
9a27d266-e0a8-466c-9a9e-ad7c3fadbf89	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:19.484+07	2026-10-15 13:52:19.484+07
8b56803a-f4da-424d-9a68-5af8ccdd3437	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:19.487+07	2026-10-15 13:52:19.487+07
d862b618-ad3b-4a84-b78b-9aef00799e3f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:19.49+07	2026-10-15 13:52:19.49+07
7cf10761-1986-479e-85b8-8da0af0d3347	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:19.494+07	2026-10-15 13:52:19.494+07
40677f56-6409-4351-af7c-5162d22d8eea	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:19.496+07	2026-10-15 13:52:19.496+07
030665b9-34e4-4072-ae72-bd09f9bc3e41	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:19.498+07	2026-10-15 13:52:19.498+07
a9964dde-c798-421a-84ae-eb68d1e198dc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:19.5+07	2026-10-15 13:52:19.5+07
7bab8615-7c61-4f6f-aa17-108edd5687cd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:19.502+07	2026-10-15 13:52:19.502+07
0d0f6488-abc2-4961-a094-b417709a09e1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:19.507+07	2026-10-15 13:52:19.507+07
3a78e911-8395-4563-a1e0-f0ff5e331b45	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:19.509+07	2026-10-15 13:52:19.509+07
3e449a06-a027-4b28-8517-d05978d3c112	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:19.511+07	2026-10-15 13:52:19.511+07
9fb9b8d0-25c5-4247-8993-bdee9e8e8a17	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:19.513+07	2026-10-15 13:52:19.513+07
b5b9dc85-94c7-4f39-9da7-f4c29184767a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:19.516+07	2026-10-15 13:52:19.516+07
60d38009-7f88-4ddb-8131-1f2490b59bb6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:19.519+07	2026-10-15 13:52:19.519+07
8c994ef8-1e87-46f2-aac7-67daab286016	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:19.526+07	2026-10-15 13:52:19.526+07
4e2a9acb-5fb8-480a-8dab-5d82478bf9b9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:19.528+07	2026-10-15 13:52:19.528+07
52c19367-41d3-4236-a06f-101ee2f8b9ac	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:19.531+07	2026-10-15 13:52:19.531+07
ff399fbc-fb3f-4875-b8e2-c2afe2bf9ffa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:19.534+07	2026-10-15 13:52:19.534+07
a0b28a3c-fd6c-4074-b8e1-72c63ed2ec2a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:19.536+07	2026-10-15 13:52:19.536+07
71a476ca-c782-4885-86f7-c51d02bf2be8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:19.54+07	2026-10-15 13:52:19.54+07
332906ad-67b7-4002-b726-02c1ddb8e54e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:19.542+07	2026-10-15 13:52:19.542+07
4ce84856-3869-4e57-bcf4-c73a29c15bfd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:19.544+07	2026-10-15 13:52:19.544+07
53200d9e-4fcf-4d54-bc69-97de58ed0793	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:19.546+07	2026-10-15 13:52:19.546+07
9dc9bcd8-ae3f-464c-ba94-f5f3d1f5c3be	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:19.548+07	2026-10-15 13:52:19.548+07
9109a49c-b4e7-4775-be6a-1a2f880e913d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:19.551+07	2026-10-15 13:52:19.551+07
234e24dd-ec1d-4391-b82c-469c495366b6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:19.553+07	2026-10-15 13:52:19.553+07
7e5b2f40-95f6-44c1-a137-ca420c9769bf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:19.558+07	2026-10-15 13:52:19.558+07
3b279ec6-3036-4149-b857-5788e11fa6c6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:19.56+07	2026-10-15 13:52:19.56+07
22c11275-417c-4ded-a6ba-72d1723b3a28	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:19.562+07	2026-10-15 13:52:19.562+07
21d08166-1170-43cf-9c69-a84718998a95	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:19.565+07	2026-10-15 13:52:19.565+07
4be0db80-f785-4d38-b59c-eb5b2e36ec80	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:19.567+07	2026-10-15 13:52:19.567+07
1b00cbfe-93e9-4702-b3b3-fb9802a5d648	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:19.569+07	2026-10-15 13:52:19.569+07
5e295ee8-5506-48d4-8fbb-0aae4a5591b2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:19.574+07	2026-10-15 13:52:19.574+07
20ed417b-2bc0-4c1a-9e83-d70e8a238e0b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:19.577+07	2026-10-15 13:52:19.577+07
fbef5447-5a50-40e2-b0dd-ebf7dbbd712a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:19.579+07	2026-10-15 13:52:19.579+07
8a860257-bf03-4d4c-a2fe-ea5e57407404	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:19.581+07	2026-10-15 13:52:19.581+07
6fb525b4-8e53-45cb-a3a3-ad40a4cb25d2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:19.583+07	2026-10-15 13:52:19.583+07
5a4b4ed5-7c4c-486d-af87-9480fe985994	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:19.585+07	2026-10-15 13:52:19.585+07
8d5ea71e-e3a7-4335-9a2d-d4129e3a0294	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:19.588+07	2026-10-15 13:52:19.588+07
f5a7995c-eabf-469e-a593-c9a73e2587c3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:19.591+07	2026-10-15 13:52:19.591+07
db1cc1a1-cdfd-435b-b1fe-3d07305c8c32	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:19.593+07	2026-10-15 13:52:19.593+07
fa64afed-35ac-4609-a8a2-e2820288f128	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:19.595+07	2026-10-15 13:52:19.595+07
94634909-e84a-4240-98f3-3a07a4b9291b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:19.597+07	2026-10-15 13:52:19.597+07
2a95f2ee-7192-4024-a42c-74118f2987ea	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:19.599+07	2026-10-15 13:52:19.599+07
754d5371-5061-4660-9499-47843774fe1a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:19.601+07	2026-10-15 13:52:19.601+07
f9a5b53b-d015-4520-acfa-a28724fc856c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:19.604+07	2026-10-15 13:52:19.604+07
65239a12-5841-4422-879f-5e31454aefbc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:19.608+07	2026-10-15 13:52:19.608+07
290d896d-78ab-42b2-a8f8-ed053dec2ef9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:19.61+07	2026-10-15 13:52:19.61+07
dec0f63b-7b97-4a4d-8e4a-d268a018344c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:19.612+07	2026-10-15 13:52:19.612+07
9d0e1952-3fd3-4510-ba44-bed22d699380	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:19.614+07	2026-10-15 13:52:19.614+07
19900218-c39d-4b2a-bd0a-3883b6e34b30	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:19.616+07	2026-10-15 13:52:19.616+07
2d20ab1b-72d4-462d-8b30-e735231ed958	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:19.618+07	2026-10-15 13:52:19.618+07
f191c9ed-5c4a-4008-a9ef-89969b5ac385	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:19.621+07	2026-10-15 13:52:19.621+07
a1f626c2-5ec9-4ce9-983b-ab23cf6ce07c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:19.625+07	2026-10-15 13:52:19.625+07
01c6df13-9622-4e86-8543-49a57eeb4504	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:19.627+07	2026-10-15 13:52:19.627+07
a2cfcf3b-c10a-4ed6-b6c7-da54a41af30c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:19.629+07	2026-10-15 13:52:19.629+07
de1914b1-e89c-4880-b81e-8a28261c7c19	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:19.631+07	2026-10-15 13:52:19.631+07
e35d15fc-0a24-4529-96aa-ed87f7f8fd3d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:19.634+07	2026-10-15 13:52:19.634+07
58f22751-3ec6-4d09-81f5-3b99b73ca7d6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:19.636+07	2026-10-15 13:52:19.636+07
73d5df0b-a156-4dba-af2d-8f04342b96cc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:19.64+07	2026-10-15 13:52:19.64+07
0246c313-1b81-49fe-8628-c055e3a6161d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:19.642+07	2026-10-15 13:52:19.642+07
2a96dbf7-8471-4331-a275-911f3fb76493	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:19.644+07	2026-10-15 13:52:19.644+07
b6f6ebd2-77a4-4168-bd56-92c111bb7a10	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:19.646+07	2026-10-15 13:52:19.646+07
607490c5-9498-45dc-8bc6-2cd36b198bcc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:19.649+07	2026-10-15 13:52:19.649+07
377eae46-251d-4a44-a695-b4e7c99aa2f7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:19.651+07	2026-10-15 13:52:19.651+07
9140c047-2736-4530-9138-6f4eea8a52ae	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:19.653+07	2026-10-15 13:52:19.653+07
d3bad13f-a4e6-4c61-8464-9c5c4110b8d7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:19.657+07	2026-10-15 13:52:19.657+07
4b19c0b3-d348-4a0f-b78d-44b87c0717ab	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:19.659+07	2026-10-15 13:52:19.659+07
c4b66064-f770-4400-bc16-b4b53d076a7a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:19.661+07	2026-10-15 13:52:19.661+07
fd3996be-d311-46f4-81e1-776579b46f4d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:19.663+07	2026-10-15 13:52:19.663+07
5dd7d67c-6e67-4f09-8e6b-e8dd36775bde	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:19.665+07	2026-10-15 13:52:19.665+07
597ab540-106e-4fe4-b1c8-cf112b5c1882	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:19.667+07	2026-10-15 13:52:19.667+07
274a8f1c-1b13-44ac-874a-f89f804653dd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:19.669+07	2026-10-15 13:52:19.669+07
56f367d1-397c-4edb-b7c1-eb0ced44692e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:19.673+07	2026-10-15 13:52:19.673+07
1c1369bb-2287-4316-83f1-b2523672d6fc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:19.675+07	2026-10-15 13:52:19.675+07
567810d7-5ebb-4e57-8a24-c8271577fcdc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:19.677+07	2026-10-15 13:52:19.677+07
432e09e9-7004-4f61-8754-b89d70538b8c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:19.679+07	2026-10-15 13:52:19.679+07
84fdebe1-738c-40ec-90c0-f73b6b917fe1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:19.681+07	2026-10-15 13:52:19.681+07
0f401418-7b47-40bf-a011-29ddfe321e1c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:19.683+07	2026-10-15 13:52:19.683+07
c3287f60-8a9d-4ab3-91e5-40143743dee5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:19.685+07	2026-10-15 13:52:19.685+07
4858acb8-a399-4587-8504-645b6743dd6b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:19.689+07	2026-10-15 13:52:19.689+07
a120673e-5683-496f-acd7-3a2f7e113905	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:19.691+07	2026-10-15 13:52:19.691+07
c9e02459-f043-4a13-9e7a-dddec13af6a5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:19.693+07	2026-10-15 13:52:19.693+07
351a5967-a24b-4b69-85df-cf3cc4a14a50	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:19.696+07	2026-10-15 13:52:19.696+07
b5ecf224-d6e7-44a3-99ec-6add359dafc0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:19.698+07	2026-10-15 13:52:19.698+07
7bf5d853-bcbc-4808-9e82-8603cf60637d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:19.7+07	2026-10-15 13:52:19.7+07
23d5b704-115e-447e-97b2-57eb24e64b2a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:19.702+07	2026-10-15 13:52:19.702+07
1adcd8e1-b56c-48d3-9140-5b50c9486f5c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:19.706+07	2026-10-15 13:52:19.706+07
b2e811a9-f1d9-487b-8331-69d54bcecf4d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:19.708+07	2026-10-15 13:52:19.708+07
777fbbe6-528e-410a-826f-4b78035745dd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:19.71+07	2026-10-15 13:52:19.71+07
a75fc5c9-ed61-420f-933a-c1d1b7cd0b1f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:19.712+07	2026-10-15 13:52:19.712+07
a4262bfb-ca89-4582-aaf9-aa88f68cebcb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:19.714+07	2026-10-15 13:52:19.714+07
7388ab89-e11a-4725-a3d3-35be4afcb7a6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:19.716+07	2026-10-15 13:52:19.716+07
7fba61b0-181a-425e-85cd-41234401835a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:19.718+07	2026-10-15 13:52:19.718+07
99f41a04-a5b1-491e-8cf8-7354d224b694	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:19.722+07	2026-10-15 13:52:19.722+07
7adaa5b7-e13f-4e39-a3a8-46c47213e786	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:19.724+07	2026-10-15 13:52:19.724+07
c91c2149-c5e4-4027-ab11-76f9d563b419	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:19.726+07	2026-10-15 13:52:19.726+07
66482ea1-0489-4c76-a990-49bd3c60e21a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:19.728+07	2026-10-15 13:52:19.728+07
d7192f3c-185a-442d-9927-30cc0ff55aea	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:19.73+07	2026-10-15 13:52:19.73+07
8c257c0b-3801-49b0-b9b1-6330d4e44ffe	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:19.732+07	2026-10-15 13:52:19.732+07
23a9ee0d-7b4e-418c-961e-7fac0e557cc2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:19.734+07	2026-10-15 13:52:19.734+07
80ac695e-707c-48ee-b0db-321fd7b067f7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:19.736+07	2026-10-15 13:52:19.736+07
f5766e39-5f98-48d7-b97f-601264f59b2a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:19.74+07	2026-10-15 13:52:19.74+07
b4fa8b29-f065-497d-abfd-4865177afbf9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:19.742+07	2026-10-15 13:52:19.742+07
efd5a5ff-c3e3-49d3-9877-1bbe4ee57a1c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:19.744+07	2026-10-15 13:52:19.744+07
69195724-e03b-4899-8b45-83681720e2c4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:19.746+07	2026-10-15 13:52:19.746+07
0de10590-2155-49fd-8c8c-8725613006e6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:19.748+07	2026-10-15 13:52:19.748+07
88cc60d5-033c-4cfe-abe9-468eb42bae6e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:19.75+07	2026-10-15 13:52:19.75+07
a6110c62-210e-4fb8-bb9c-148268629309	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:19.752+07	2026-10-15 13:52:19.752+07
06e4c507-69ca-4842-928d-edf6e65f4955	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:19.755+07	2026-10-15 13:52:19.755+07
bf5f4a62-0778-4534-8e92-e847892e2efb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:19.757+07	2026-10-15 13:52:19.757+07
7313a70b-1acc-48fd-b7aa-e4c39b071f50	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:19.759+07	2026-10-15 13:52:19.759+07
09c60aae-a724-4906-9296-f88cc8390df4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:19.761+07	2026-10-15 13:52:19.761+07
942a5fad-10e1-44be-b06f-d51237468f50	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:19.763+07	2026-10-15 13:52:19.763+07
615eea97-b3d1-4298-817a-8b3e5d265166	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:19.766+07	2026-10-15 13:52:19.766+07
9511ace4-995a-4458-ab70-f52ea6618c6b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:19.768+07	2026-10-15 13:52:19.768+07
5f032971-53ae-48b9-b9b5-9521d2cafbbe	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:19.772+07	2026-10-15 13:52:19.772+07
2d3bc0f0-37de-4bf7-8acd-aa51ca508637	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:19.775+07	2026-10-15 13:52:19.775+07
b4eb951e-f55d-4814-bcb9-0408f1423295	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:19.777+07	2026-10-15 13:52:19.777+07
e9a71743-1320-47bc-b447-028cbc46c790	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:19.779+07	2026-10-15 13:52:19.779+07
199913b6-1eec-424d-8308-836dc526c067	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:19.781+07	2026-10-15 13:52:19.781+07
2df57236-63de-43ea-848f-c2db7ec6821a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:19.784+07	2026-10-15 13:52:19.784+07
c7952dc8-5c60-4158-802e-8009a974765f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:19.786+07	2026-10-15 13:52:19.786+07
88e63438-3a68-4e92-9c15-9cfde544d2d4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:19.789+07	2026-10-15 13:52:19.789+07
445750ba-d65c-4f5d-88f8-fdf0edb7f1bc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:19.791+07	2026-10-15 13:52:19.791+07
ebf16fce-4ead-4352-80cc-ffe1ceb99e78	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:19.794+07	2026-10-15 13:52:19.794+07
bccd57e3-a045-4b2e-a53d-6dfa22938666	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:19.795+07	2026-10-15 13:52:19.795+07
25b2dda6-0b11-4b28-8a4e-1f6bd1c407c7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:19.797+07	2026-10-15 13:52:19.797+07
9d21dd00-d26f-4913-8e4f-8d9b26eba44e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:19.799+07	2026-10-15 13:52:19.799+07
fd006673-bbc3-47e0-b1af-a782fda246ca	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:19.801+07	2026-10-15 13:52:19.801+07
8a31b622-3a6b-4f8b-83b4-5e33becb4d6d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:19.805+07	2026-10-15 13:52:19.805+07
e635b36e-bcb1-434e-b8ff-e95088b6f0b3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:19.807+07	2026-10-15 13:52:19.807+07
9aac8d34-f016-47cc-891a-c5fa54e41d09	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:19.809+07	2026-10-15 13:52:19.809+07
40c59497-fdff-497c-849b-cb4a95cb7e7b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:19.811+07	2026-10-15 13:52:19.811+07
88e25c72-a9f6-4021-b880-a38ca5537001	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:19.813+07	2026-10-15 13:52:19.813+07
1a0cf15e-972d-4240-8d92-f8fd59ef113c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:19.815+07	2026-10-15 13:52:19.815+07
d74a66ec-d5d3-4c05-8659-368b94d30d9e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:19.817+07	2026-10-15 13:52:19.817+07
efec29a9-e7df-4f18-92cd-c81322b34e45	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:19.819+07	2026-10-15 13:52:19.819+07
d9ca10ea-04e9-4830-ae74-1a46e9a12522	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:19.822+07	2026-10-15 13:52:19.822+07
4e18416f-2890-432a-9807-3c4e44b4f3e1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:19.825+07	2026-10-15 13:52:19.825+07
de6d6d28-0f0f-4d40-b4f9-60fa777cb48c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:19.827+07	2026-10-15 13:52:19.827+07
d2f4341e-2aab-46c3-beda-79663d1ac671	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:19.829+07	2026-10-15 13:52:19.829+07
d2653897-16eb-4a54-927f-a4e867ec90ea	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:19.831+07	2026-10-15 13:52:19.831+07
ce402fe7-af06-4a2f-88a4-065205573484	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:19.833+07	2026-10-15 13:52:19.833+07
153d8202-421a-4064-8e7d-44b728818e50	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:19.835+07	2026-10-15 13:52:19.835+07
1c4a7bc1-6375-4a88-a0ee-b4a78627d2c5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:19.838+07	2026-10-15 13:52:19.838+07
e02095d0-aeb7-4613-aa48-975446698fec	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:19.841+07	2026-10-15 13:52:19.841+07
0fe5b311-c6d3-4771-9aa2-74b746608ae9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:19.842+07	2026-10-15 13:52:19.842+07
311c0cc6-d677-48d1-b724-d61891ed1095	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:19.845+07	2026-10-15 13:52:19.845+07
0ea40eda-2893-4579-8a9d-34618c49bffc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:19.847+07	2026-10-15 13:52:19.847+07
19cfd6ad-4247-4094-a28f-f526b0f6c489	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:19.849+07	2026-10-15 13:52:19.849+07
164b369f-8623-4509-8afc-ac9bcf4df4b2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:19.851+07	2026-10-15 13:52:19.851+07
f37d772d-d5ec-477a-8c33-deab3214a13e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:19.853+07	2026-10-15 13:52:19.853+07
f000163f-3f8f-4715-9a99-ef506784f2ea	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:19.856+07	2026-10-15 13:52:19.856+07
74c8dea3-53eb-4bff-8754-19a6eb5280a3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:19.858+07	2026-10-15 13:52:19.858+07
b290486e-d51c-4402-b371-e4164016f87c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:19.86+07	2026-10-15 13:52:19.86+07
cc3ec159-7cd0-4181-8d3a-6fef0566d0fd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:19.862+07	2026-10-15 13:52:19.862+07
99eafd07-fdb4-4468-9332-d9d99ffaafa3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:19.864+07	2026-10-15 13:52:19.864+07
df565cbf-056a-4c2e-85c7-c9d61470ab27	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:19.866+07	2026-10-15 13:52:19.866+07
1df80faa-3459-42d7-a91d-dc3071dfb918	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:19.868+07	2026-10-15 13:52:19.868+07
71dee41e-b2e9-4278-aa71-879ebff53fb6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:19.872+07	2026-10-15 13:52:19.872+07
ad6f6b38-446a-493c-85bc-4770711e8fd0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:19.874+07	2026-10-15 13:52:19.874+07
f8f03bcc-e9d8-46f3-9ca6-06d424ba8492	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:19.876+07	2026-10-15 13:52:19.876+07
4da16268-eb1c-4dba-92b4-efd908074b73	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:19.878+07	2026-10-15 13:52:19.878+07
4a47fa8c-16f7-41f7-b180-e64d384535cc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:19.88+07	2026-10-15 13:52:19.88+07
c5f4ee07-031f-4812-9de8-ebc29e0d2e63	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:19.882+07	2026-10-15 13:52:19.882+07
738e2034-93f8-4557-b192-a5569f3763f3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:19.884+07	2026-10-15 13:52:19.884+07
f7e5fedc-e276-41a0-9603-c7c1d318ade0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:19.886+07	2026-10-15 13:52:19.886+07
0edfc8b2-400c-4b9e-894e-9e7fdcb35a86	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:19.889+07	2026-10-15 13:52:19.889+07
1a8e7283-d0df-4cb3-a900-3601944999c3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:19.891+07	2026-10-15 13:52:19.891+07
a76e851c-1112-4e71-ae03-6830ebdcd4ff	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:19.894+07	2026-10-15 13:52:19.894+07
f10ae70b-83e5-4482-a146-0766b5105243	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:19.896+07	2026-10-15 13:52:19.896+07
cad0ffb5-4306-4bca-999d-3b24373d9af9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:19.898+07	2026-10-15 13:52:19.898+07
bb7dfbf9-868d-466f-b875-16b464ec6b57	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:19.899+07	2026-10-15 13:52:19.899+07
bfd26ed3-6b42-4d07-a8db-f4d1191de33f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:19.901+07	2026-10-15 13:52:19.901+07
152c7300-7c5f-49ef-95a6-a44fcaa07df9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:19.905+07	2026-10-15 13:52:19.905+07
62785856-5cda-46fe-b1bc-9e47ab63f6cb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:19.908+07	2026-10-15 13:52:19.908+07
a2f32b66-ec77-496d-bde2-8c5d028396a8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:19.91+07	2026-10-15 13:52:19.91+07
a178b09d-2bcf-4eeb-869c-f94f91ac69d7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:19.912+07	2026-10-15 13:52:19.912+07
b166109e-1b82-4406-ac25-1122ab69a8e8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:19.914+07	2026-10-15 13:52:19.914+07
112097f8-6fa7-4dc1-abe1-6f9867a893de	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:19.916+07	2026-10-15 13:52:19.916+07
6db2ad61-83b3-4497-a87f-168c40bf9ea1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:19.918+07	2026-10-15 13:52:19.918+07
e2dce9f2-2baa-46ec-b7a4-422d6fd03ef1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:19.92+07	2026-10-15 13:52:19.92+07
d307e120-aa1c-4bb7-b62f-6a1766771be6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:19.923+07	2026-10-15 13:52:19.923+07
10dc4886-176e-4a93-8913-de56acaa96b2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:19.925+07	2026-10-15 13:52:19.925+07
3b5d917e-a554-4a3b-9778-6a34db819271	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:19.927+07	2026-10-15 13:52:19.927+07
9f018ec8-76c0-4c51-b633-d60a1d76139d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:19.929+07	2026-10-15 13:52:19.929+07
3e136319-c649-46b6-a0ac-4809f87aeecd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:19.931+07	2026-10-15 13:52:19.931+07
dfbb0fb7-6a70-4f82-8213-2c14313c3dd4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:19.934+07	2026-10-15 13:52:19.934+07
e028ea9d-5ef9-4f72-9dea-8d64bd12f638	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:19.936+07	2026-10-15 13:52:19.936+07
16404f2a-794f-4510-b1aa-663b5046663f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:19.939+07	2026-10-15 13:52:19.939+07
ee230a7c-2ea3-4150-8aff-91405bd5adea	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:19.942+07	2026-10-15 13:52:19.942+07
d3d5ee41-6aa2-4423-8d5c-f27cc00515c9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:19.944+07	2026-10-15 13:52:19.944+07
b2246c50-e38b-4efe-904f-830c09c5d369	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:19.946+07	2026-10-15 13:52:19.946+07
f91c399b-fea6-42fb-b3b7-47b440de3ff9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:19.948+07	2026-10-15 13:52:19.948+07
c2e06928-e70c-4d87-89a3-fcbbba2a0caf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:19.95+07	2026-10-15 13:52:19.95+07
39fa4c42-bc8c-4c5a-86c2-a1e16a93ac04	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:19.952+07	2026-10-15 13:52:19.952+07
09c82eec-acab-48ea-94d5-14a51d7bd912	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:19.956+07	2026-10-15 13:52:19.956+07
586b3944-9ff7-44e8-acc5-d42974c363f0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:19.959+07	2026-10-15 13:52:19.959+07
3acbb6e7-741b-45b7-af2a-97da5f6b75f1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:19.961+07	2026-10-15 13:52:19.961+07
3661518d-5b0d-4995-9b94-35a29697fde7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:19.963+07	2026-10-15 13:52:19.963+07
181b00a9-e415-4092-a1d4-e0c00e511fd4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:19.965+07	2026-10-15 13:52:19.965+07
577fa33f-bd94-495e-b6aa-d9e1fc1fe750	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:19.967+07	2026-10-15 13:52:19.967+07
18e18280-77ea-41df-a38f-be869a41f655	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:19.969+07	2026-10-15 13:52:19.969+07
86ac3fee-6fd2-4e67-8243-e5c0efca1998	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:19.972+07	2026-10-15 13:52:19.972+07
73c2328d-aba6-4d19-8e1e-a548930279f6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:19.975+07	2026-10-15 13:52:19.975+07
642cde08-a344-46aa-ba43-d4b9f9eb6b33	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:19.977+07	2026-10-15 13:52:19.977+07
0a0cb8a8-3aae-4ffb-a03c-74536959cb77	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:19.979+07	2026-10-15 13:52:19.979+07
883dde56-113a-4818-99a7-590dddb7b504	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:19.981+07	2026-10-15 13:52:19.981+07
7362f7ec-5c5f-4ba6-ae47-6a13e9e03abc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:19.983+07	2026-10-15 13:52:19.983+07
7e13b203-788f-417a-af8b-6aa1a7a205b6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:19.985+07	2026-10-15 13:52:19.985+07
08bb0b95-3876-424b-9bbd-1c0b010457e6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:19.988+07	2026-10-15 13:52:19.988+07
b10841c3-d7be-4a4e-b20a-a82c5924c989	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:19.991+07	2026-10-15 13:52:19.991+07
dc5fb227-fe52-4a59-8863-ea5b1144cf7c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:19.993+07	2026-10-15 13:52:19.993+07
a6557134-7de5-4794-9acd-099c11143852	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:19.995+07	2026-10-15 13:52:19.995+07
c3ba1411-0aa6-47bb-a287-121403552a73	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:19.997+07	2026-10-15 13:52:19.997+07
b127cc8e-9b2b-4a43-b301-973842054266	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:19.999+07	2026-10-15 13:52:19.999+07
095ddb5b-dc12-40c1-b52d-c34219db55e5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:20.001+07	2026-10-15 13:52:20.001+07
dececf51-91e1-4333-aba1-edd68be0bbef	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:20.004+07	2026-10-15 13:52:20.004+07
25f47e85-91c8-408d-8485-e7f159758c22	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:20.007+07	2026-10-15 13:52:20.007+07
3c07e0a8-60f4-4d72-a1c5-b0db394d6934	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:20.009+07	2026-10-15 13:52:20.009+07
92f82f95-ec47-4b34-b468-859fc964ebc0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:20.011+07	2026-10-15 13:52:20.011+07
9fef7981-b95c-40ee-beb5-6cb4a34d47da	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:20.013+07	2026-10-15 13:52:20.013+07
418563b8-197c-4a88-875c-01b4eb521f40	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:20.015+07	2026-10-15 13:52:20.015+07
5f44e1af-5c39-4207-8aca-f2af4479912a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:20.017+07	2026-10-15 13:52:20.017+07
72fb32e3-b786-478d-a4be-f8d162f67c16	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:20.02+07	2026-10-15 13:52:20.02+07
5a9c07f6-f207-40a5-95fd-ec528026d423	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:20.024+07	2026-10-15 13:52:20.024+07
3218a10a-17c5-4077-9223-bd048941f704	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:20.026+07	2026-10-15 13:52:20.026+07
a81d1c63-0952-4e86-b0d8-5d78722d412c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:20.028+07	2026-10-15 13:52:20.028+07
c5422cbb-aaa5-45bf-9bba-249814124129	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:20.03+07	2026-10-15 13:52:20.03+07
742a1b04-6822-4e5c-9d2b-d6503d1cebbf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:20.032+07	2026-10-15 13:52:20.032+07
487976b8-060b-43d8-a6e1-fd861e747cec	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:20.034+07	2026-10-15 13:52:20.034+07
4088470d-4591-4eed-a60a-c1e9c4c8f067	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:20.036+07	2026-10-15 13:52:20.036+07
5c3bff56-3f2e-48f1-a7a3-6dce8deb468e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:20.04+07	2026-10-15 13:52:20.04+07
a54b8d2d-f4f9-4f02-8747-95c73f850259	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:20.042+07	2026-10-15 13:52:20.042+07
7111ce01-1ceb-4f4a-a21c-8e3e9255bb7e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:20.044+07	2026-10-15 13:52:20.044+07
2ea091ae-fe2b-4acc-8c46-642981df0085	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:20.046+07	2026-10-15 13:52:20.046+07
33971a4c-de4d-449a-a519-060874f1e8e3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:20.048+07	2026-10-15 13:52:20.048+07
0daf1536-9aa8-4ca9-bafd-250706e07758	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:20.05+07	2026-10-15 13:52:20.05+07
8f9f9428-7402-4b69-b87d-b1d187d41cd3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:20.052+07	2026-10-15 13:52:20.052+07
dc1786c4-936a-4386-94e2-876fbf3be116	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:20.056+07	2026-10-15 13:52:20.056+07
6f835c22-22a7-4583-bea7-113c172255f0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:20.058+07	2026-10-15 13:52:20.058+07
494261bd-294f-430c-ab27-8fef9df13222	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:20.06+07	2026-10-15 13:52:20.06+07
113e7cef-ddeb-4be2-926c-6ef6cde5d182	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:20.062+07	2026-10-15 13:52:20.062+07
2ef385c1-7913-44cf-a517-49bf2751028e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:20.064+07	2026-10-15 13:52:20.064+07
ebfcda01-eda0-4b78-ad4e-ad85079eb624	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:20.066+07	2026-10-15 13:52:20.066+07
15083f6f-6a77-4625-94de-cc7285097146	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:20.068+07	2026-10-15 13:52:20.068+07
9be0a20d-64c9-44ee-b310-54c502c88767	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:20.071+07	2026-10-15 13:52:20.071+07
569fccdc-5e97-4263-9f89-91be25229923	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:20.074+07	2026-10-15 13:52:20.074+07
064900fe-2ec4-4116-8f88-3347498b9555	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:20.076+07	2026-10-15 13:52:20.076+07
31b83a14-9019-43b7-bd9a-9bfdadba33a7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:20.078+07	2026-10-15 13:52:20.078+07
0e392fad-49e0-4c2a-887a-5e0b871a5fca	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:20.08+07	2026-10-15 13:52:20.08+07
1853e096-3141-465f-8c54-a7d95a5504e2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:20.082+07	2026-10-15 13:52:20.082+07
7f7c5cdf-501e-4c99-9ba3-b4f6cda9f793	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:20.084+07	2026-10-15 13:52:20.084+07
a02ca6f5-355a-432f-8657-0810b9fd1f32	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:20.086+07	2026-10-15 13:52:20.086+07
56048f7e-ee21-4723-8650-1ef9b2417ba6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:20.09+07	2026-10-15 13:52:20.09+07
c452a487-5932-4009-ba61-ee8d6c4241a5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:20.092+07	2026-10-15 13:52:20.092+07
2bd50e32-affd-447a-b55f-47852ab55435	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:20.094+07	2026-10-15 13:52:20.094+07
a6378db1-9b76-4d29-857a-c04255b644e9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:20.096+07	2026-10-15 13:52:20.096+07
070d6538-a709-40e5-9f1c-bb59802d4d72	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:20.098+07	2026-10-15 13:52:20.098+07
ca4414bc-b105-4c73-959f-65c47e6f67df	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:20.1+07	2026-10-15 13:52:20.1+07
159a9f49-f491-4857-a0c3-fcc956ad60a8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:20.102+07	2026-10-15 13:52:20.102+07
71f8bc10-aa7c-4c2c-bfa9-ac0432393ccc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:20.106+07	2026-10-15 13:52:20.106+07
4a0dbfac-71d9-4640-8573-f97aa7fe69ad	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:20.108+07	2026-10-15 13:52:20.108+07
d7615df8-1281-49af-a368-b9b3ccc25f5d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:20.11+07	2026-10-15 13:52:20.11+07
bc7e7daa-4be2-40ef-bf12-fcf5d3c3cfc6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:20.112+07	2026-10-15 13:52:20.112+07
4147b020-a574-42c3-a8dc-669bf26acc7b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:20.114+07	2026-10-15 13:52:20.114+07
edca81f9-95da-4f9d-bff2-43aff9ea1f62	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:20.116+07	2026-10-15 13:52:20.116+07
b28d389a-693e-4fff-84d9-90ca6b18404f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:20.118+07	2026-10-15 13:52:20.118+07
7871adb4-c288-448e-b460-aa595b676a4b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:20.122+07	2026-10-15 13:52:20.122+07
f33ee74b-0e53-4ab6-9267-41fdcfc1ad52	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:20.124+07	2026-10-15 13:52:20.124+07
94060215-228a-4b50-a4b0-9efdaadc9e8b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:20.126+07	2026-10-15 13:52:20.126+07
5c21fd68-3b85-4114-85ae-564304930302	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:20.128+07	2026-10-15 13:52:20.128+07
aaffc74b-3c92-4ee2-b0d5-ee8545f37cc4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:20.13+07	2026-10-15 13:52:20.13+07
65611f37-e5eb-4326-acf7-aff644e793e6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:20.132+07	2026-10-15 13:52:20.132+07
33d5d4c4-9fbe-4c43-b64b-7a9860c36a55	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:20.135+07	2026-10-15 13:52:20.135+07
e473c037-0dbb-4a87-8a5b-f84ff66cdb54	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:20.137+07	2026-10-15 13:52:20.137+07
b9297f7c-09e6-419a-9b57-2b3c541ac49a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:20.14+07	2026-10-15 13:52:20.14+07
96a24945-98fc-4c81-b606-8df9ac682b5b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:20.142+07	2026-10-15 13:52:20.142+07
6930d65f-08ba-41a5-800f-689f3f60a2a8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:20.144+07	2026-10-15 13:52:20.144+07
c8851f8d-3a2a-45ad-9633-82b297a29e5f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:20.147+07	2026-10-15 13:52:20.147+07
82f85f46-2636-4245-8f12-59897737ed85	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:20.15+07	2026-10-15 13:52:20.15+07
a64c6dcd-f9a0-4128-ae7a-3934b94f24c6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:20.152+07	2026-10-15 13:52:20.152+07
eecceec4-f68b-413c-8791-13cb0cf9c056	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:20.156+07	2026-10-15 13:52:20.156+07
b02056e1-1933-4a31-9f47-7fdbda9bbbf5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:20.158+07	2026-10-15 13:52:20.158+07
3f241017-4c29-48e8-a412-7a41ee8d597b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:20.16+07	2026-10-15 13:52:20.16+07
5e15ca1b-5329-4021-8901-c32484ecb6b6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:20.162+07	2026-10-15 13:52:20.162+07
3f846319-81c5-46cb-9cda-ed289d450827	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:20.164+07	2026-10-15 13:52:20.164+07
89b8ff54-cacb-40a9-b01d-ffef469029cb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:20.166+07	2026-10-15 13:52:20.166+07
8aac3e97-d815-47d1-a3f4-119f142c406f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:20.168+07	2026-10-15 13:52:20.168+07
047d8773-31cc-4a2b-801a-2192d811c548	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:20.172+07	2026-10-15 13:52:20.172+07
ba77b452-92b4-4c59-98ff-f7adf90f2872	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:20.174+07	2026-10-15 13:52:20.174+07
1680dadc-ac77-4775-8fba-d68d0dcd57ca	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:20.176+07	2026-10-15 13:52:20.176+07
d754dca8-a0fb-4a18-bdce-677d8f0ef96b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:20.178+07	2026-10-15 13:52:20.178+07
0783962d-9943-4095-9eac-56cdae89d431	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:20.18+07	2026-10-15 13:52:20.18+07
25a02dc8-e475-4fd2-bfc7-91c4aad1495f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:20.182+07	2026-10-15 13:52:20.182+07
ec613fde-2b61-4bb5-a834-9c72f6b5404f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:20.184+07	2026-10-15 13:52:20.184+07
03da8c88-6c7d-4f9f-8c2a-589466b37b3b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:20.186+07	2026-10-15 13:52:20.186+07
d5a71e8b-431c-4076-9690-152d162d7b5a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:20.19+07	2026-10-15 13:52:20.19+07
9b129b54-07d9-4b29-aa2a-5cf6c77dd8ad	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:20.192+07	2026-10-15 13:52:20.192+07
a0f5d755-688b-4f8a-b415-24b6ec23845b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:20.194+07	2026-10-15 13:52:20.194+07
19fb0b5a-1ce0-4acb-a529-0bdab4807bd7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:20.196+07	2026-10-15 13:52:20.196+07
b397f292-8773-4efe-8dd5-3d25647a979f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:20.198+07	2026-10-15 13:52:20.198+07
1f961590-f876-45b7-810e-28802007e263	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:20.2+07	2026-10-15 13:52:20.2+07
fc6a8567-a9f2-48fa-a3e2-b6be7126386a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:20.202+07	2026-10-15 13:52:20.202+07
96131cbe-de42-446a-90fb-2b13cca156cf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:20.206+07	2026-10-15 13:52:20.206+07
6e240053-222c-4823-be59-f22879c4c925	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:20.208+07	2026-10-15 13:52:20.208+07
2c619d90-9e7f-490c-a2ac-a83fee1ae841	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:20.21+07	2026-10-15 13:52:20.21+07
c75b62ca-89c4-4802-a105-7479ade2e05f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:20.212+07	2026-10-15 13:52:20.212+07
2e26d05b-ac50-4412-9fdc-c14bf0e2c371	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:20.214+07	2026-10-15 13:52:20.214+07
64abaa77-b3f8-4a40-879a-6f5f00853266	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:20.216+07	2026-10-15 13:52:20.216+07
d0070e1e-2847-4702-8212-a6b3da3964ee	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:20.218+07	2026-10-15 13:52:20.218+07
12f0f314-aefa-48b5-8056-53f880deb2d7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:20.221+07	2026-10-15 13:52:20.221+07
93050857-4a30-429b-94a0-eb0e19fc35a8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:20.224+07	2026-10-15 13:52:20.224+07
3e393b38-aef6-48b2-a151-f85a2d7f0081	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:20.226+07	2026-10-15 13:52:20.226+07
2f570109-b994-48e0-8929-8013b90d85c3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:20.228+07	2026-10-15 13:52:20.228+07
288d825a-24d6-46e4-b8c7-c0f029aa38cc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:20.23+07	2026-10-15 13:52:20.23+07
c37b8dcd-6afe-46e0-85b9-13ec98ef9c55	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:20.232+07	2026-10-15 13:52:20.232+07
0d3464e9-c01f-4c0b-8328-d01496e3f734	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:20.234+07	2026-10-15 13:52:20.234+07
484d0577-179d-40f8-9bb9-2b51773db101	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:20.236+07	2026-10-15 13:52:20.236+07
e3919d98-49c0-4b43-bb6d-b3c7c6dfbe87	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:20.24+07	2026-10-15 13:52:20.24+07
851602a5-3923-4600-9790-b106a70405a2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:20.242+07	2026-10-15 13:52:20.242+07
7f0b59ab-7c2e-40cb-b1a6-13df2614ccfc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:20.244+07	2026-10-15 13:52:20.244+07
ac95cf4d-69e8-4ae2-9f0e-bb043265bf8c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:20.246+07	2026-10-15 13:52:20.246+07
f32abeeb-c620-477f-9b4c-d67c87c28d94	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:20.248+07	2026-10-15 13:52:20.248+07
868a0da8-f381-4364-bc88-309bb509fbc1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:20.25+07	2026-10-15 13:52:20.25+07
93c3756d-d1a7-440c-881b-f6a6f49581f3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:20.252+07	2026-10-15 13:52:20.252+07
25a25a25-e615-4be7-ac29-5ff0a8f23bb3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:20.255+07	2026-10-15 13:52:20.255+07
5b25d4eb-76c9-43d1-8e2e-8fd3b4776e30	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:20.257+07	2026-10-15 13:52:20.257+07
695ed52a-cb11-4baf-867a-f176d1ebcc0f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:20.259+07	2026-10-15 13:52:20.259+07
d1e49db8-8fba-49a7-9d6b-4b68d9c75caf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:20.261+07	2026-10-15 13:52:20.261+07
0eec5c8c-73a4-4f47-a424-918e35e72ab3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:20.264+07	2026-10-15 13:52:20.264+07
55f6bc53-8e30-48c0-ba60-35e592168c77	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:20.266+07	2026-10-15 13:52:20.266+07
87be615e-8d86-43b5-908a-f364cc688621	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:20.267+07	2026-10-15 13:52:20.267+07
f8dd4472-1da1-45fa-a78d-b28479559306	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:20.269+07	2026-10-15 13:52:20.269+07
292ab87c-2374-424e-87ed-9b9f2b3985b5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:20.273+07	2026-10-15 13:52:20.273+07
a68a4903-5e6d-451d-ae9b-e2d0e7dd1a7f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:20.275+07	2026-10-15 13:52:20.275+07
78d39d37-2942-4e41-a19c-64b313a5864e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:20.277+07	2026-10-15 13:52:20.277+07
871afeed-3f67-4e7f-9e29-57518df9742a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:20.279+07	2026-10-15 13:52:20.279+07
eb2147e4-9e5b-4db2-a7bf-8900da6a13ce	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:20.281+07	2026-10-15 13:52:20.281+07
5d91ca62-97d2-4946-a430-375dfc9d3c76	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:20.283+07	2026-10-15 13:52:20.283+07
8dc056dc-0d3d-48b5-ab2b-d5db27161772	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:20.285+07	2026-10-15 13:52:20.285+07
2e64e78f-7cb6-4ba0-b937-f36f6bbb8eba	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:20.289+07	2026-10-15 13:52:20.289+07
5aff51d0-5e11-4ad2-b34b-6aedb439c259	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:20.291+07	2026-10-15 13:52:20.291+07
e69f4d42-40ce-48ee-8548-f6373a355496	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:20.293+07	2026-10-15 13:52:20.293+07
0358f56d-d30d-49d2-a2af-e044a5885110	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	PRESENT	\N	2026-10-15 13:52:20.295+07	2026-10-15 13:52:20.295+07
36d8078b-7137-4be2-8e4e-6c6825a25afa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:20.297+07	2026-10-15 13:52:20.297+07
4de9014f-c381-45bb-b0f5-2c1cafdf8a57	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:20.299+07	2026-10-15 13:52:20.299+07
dc759a90-b568-4b30-a634-e8f8d9481d0c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:20.301+07	2026-10-15 13:52:20.301+07
03bd6627-307f-4f1b-b783-88289a60e971	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:20.303+07	2026-10-15 13:52:20.303+07
484ba980-1a71-4bc3-b524-b724b1f64485	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:20.306+07	2026-10-15 13:52:20.306+07
f548c69a-aa66-4b87-81f1-5ff487b60b90	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:20.308+07	2026-10-15 13:52:20.308+07
ced93602-2358-46cf-8574-6eb252bdbb2f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:20.31+07	2026-10-15 13:52:20.31+07
83458a6f-9cdb-48ff-b1ba-c83eb1d08599	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:20.312+07	2026-10-15 13:52:20.312+07
29cbcd2c-35d2-41eb-b96f-083b3b236b34	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:20.315+07	2026-10-15 13:52:20.315+07
32d7c834-f88d-47ab-bc14-3cd653663c85	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:20.316+07	2026-10-15 13:52:20.316+07
aea9166d-76fc-4934-9002-13544851cc09	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:20.318+07	2026-10-15 13:52:20.318+07
201fb5f1-c697-4ff4-984e-96a698a4ac46	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:20.322+07	2026-10-15 13:52:20.322+07
46ecf635-e1b1-4f21-b4e1-02aa06b6c75b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:20.324+07	2026-10-15 13:52:20.324+07
7feb4bf5-3c72-4e8b-80c5-f341b79ce523	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:20.326+07	2026-10-15 13:52:20.326+07
9abf48f5-44ed-4b50-8922-cc98804316ee	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:20.328+07	2026-10-15 13:52:20.328+07
77e4c716-970a-4458-9aba-5210adb249ea	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:20.331+07	2026-10-15 13:52:20.331+07
d2751027-b989-4758-86ec-507801b27561	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:20.333+07	2026-10-15 13:52:20.333+07
cf2a4d97-e0cd-4a59-9e91-29aae2ea7532	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:20.338+07	2026-10-15 13:52:20.338+07
778f0c92-700e-4d38-9077-1b1b77fca8c4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:20.341+07	2026-10-15 13:52:20.341+07
4003392f-161a-46b3-b41c-14b04998729b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:20.343+07	2026-10-15 13:52:20.343+07
ad739588-44e1-4058-9986-10e3b3c57024	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:20.346+07	2026-10-15 13:52:20.346+07
d3d2e294-e89d-47ed-b190-5eee05ed014d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:20.348+07	2026-10-15 13:52:20.348+07
2ab6058a-368e-4deb-b61b-4955afb714f3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:20.35+07	2026-10-15 13:52:20.35+07
2baa0759-2d81-498d-a008-effd0167e061	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-05-18	1	PRESENT	\N	2026-10-15 13:52:20.352+07	2026-10-15 13:52:20.352+07
82d69e2c-4de6-40b5-af69-0237bbdc2cc0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-22	2	LATE	\N	2026-10-15 13:52:20.356+07	2026-10-15 13:52:20.356+07
93d94149-6b3a-4904-be6f-be7055dfaf9a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-10-29	3	PRESENT	\N	2026-10-15 13:52:20.358+07	2026-10-15 13:52:20.358+07
466e43da-8e50-4cde-a74c-817f0b6f4dc1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-05	4	PRESENT	\N	2026-10-15 13:52:20.36+07	2026-10-15 13:52:20.36+07
ed56df1e-7263-41e6-9a5b-e872b23f5410	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-12	5	PRESENT	\N	2026-10-15 13:52:20.362+07	2026-10-15 13:52:20.362+07
d6e88a55-8d9a-4d61-9db6-fdf78523b17e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-19	6	PRESENT	\N	2026-10-15 13:52:20.364+07	2026-10-15 13:52:20.364+07
62fd9588-bdb5-4942-bb6b-b7e56fa33775	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-11-26	7	PRESENT	\N	2026-10-15 13:52:20.366+07	2026-10-15 13:52:20.366+07
b2bcfb4c-21db-4563-8f73-349ada828025	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-03	8	PRESENT	\N	2026-10-15 13:52:20.368+07	2026-10-15 13:52:20.368+07
f15f7359-a8f8-4b29-9e6f-792cb92ed6b4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-10	9	PRESENT	\N	2026-10-15 13:52:20.371+07	2026-10-15 13:52:20.371+07
9b4d73a8-a391-4c6e-af8f-0397cfc4b9b9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-17	10	PRESENT	\N	2026-10-15 13:52:20.374+07	2026-10-15 13:52:20.374+07
b28306c5-a82d-4499-9d0b-e70c65cb1eab	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-24	11	PRESENT	\N	2026-10-15 13:52:20.376+07	2026-10-15 13:52:20.376+07
71bcf8df-7157-46f4-b75e-faa7ace70f82	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2026-12-31	12	PRESENT	\N	2026-10-15 13:52:20.378+07	2026-10-15 13:52:20.378+07
6ef98013-5cb0-4c7c-b934-5bf71c8a3554	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-07	13	PRESENT	\N	2026-10-15 13:52:20.38+07	2026-10-15 13:52:20.38+07
2490ac87-6039-4405-ba80-65ab3afbd22d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-14	14	PRESENT	\N	2026-10-15 13:52:20.382+07	2026-10-15 13:52:20.382+07
46f11bd8-e947-45d4-b549-04ba1b5a02f3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-21	15	PRESENT	\N	2026-10-15 13:52:20.385+07	2026-10-15 13:52:20.385+07
1c7b4a79-b964-4c0f-9419-70dabf5ab7c1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-01-28	16	PRESENT	\N	2026-10-15 13:52:20.387+07	2026-10-15 13:52:20.387+07
ff902ac4-cc73-4f67-9533-06fe06b0d2a6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-04	17	PRESENT	\N	2026-10-15 13:52:20.39+07	2026-10-15 13:52:20.39+07
3e5b56ef-adfc-400f-ae40-d9debd6090ae	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-11	18	PRESENT	\N	2026-10-15 13:52:20.392+07	2026-10-15 13:52:20.392+07
4580e101-3060-4927-bdf1-e7e768f6f64f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-18	19	PRESENT	\N	2026-10-15 13:52:20.394+07	2026-10-15 13:52:20.394+07
731ba616-2329-4b12-839c-6d0acac1e8a6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-02-25	20	PRESENT	\N	2026-10-15 13:52:20.397+07	2026-10-15 13:52:20.397+07
5aaa1ab1-c284-48fa-a3c3-b21c24328e59	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-04	21	PRESENT	\N	2026-10-15 13:52:20.399+07	2026-10-15 13:52:20.399+07
78fd2b75-1e81-4c20-b591-b056350758a6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-11	22	PRESENT	\N	2026-10-15 13:52:20.401+07	2026-10-15 13:52:20.401+07
b5016c9a-7e74-46af-9fdd-60ee6a509f0f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-18	23	PRESENT	\N	2026-10-15 13:52:20.403+07	2026-10-15 13:52:20.403+07
b83df669-d193-4811-8d64-78e6d093ee3b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-03-25	24	PRESENT	\N	2026-10-15 13:52:20.406+07	2026-10-15 13:52:20.406+07
4dc4ef1c-5de5-4187-bf26-3eb1abe97229	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2027-04-01	25	PRESENT	\N	2026-10-15 13:52:20.408+07	2026-10-15 13:52:20.408+07
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
f8a74a99-4467-4a9b-9fda-83c0476d10d9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:38.293+07
d022c5d4-3aae-440c-854b-9c4523d6b360	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:38.519+07
9766ec64-8227-4f3d-a632-0107a7505eb0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:38.528+07
43d013fd-9dc4-451d-afd4-6378a4aca6c3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:38.535+07
72c66681-1bd1-48b3-9ac9-0020d2c9e94a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:38.541+07
0c49f17c-3d48-4896-bd6d-18a3c8bdda16	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:38.547+07
6e854ac5-2bc2-4b60-a013-631b2de1b3e3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:38.553+07
cef274c3-9b98-4223-96b8-6a06ce0b39be	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:38.559+07
68d62645-b1ac-4797-9d41-0b16dd5b2518	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:38.566+07
35b2b21c-4e04-4603-80da-28cc1fd95cfe	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:38.572+07
07e0086a-ddb1-4fa5-8e36-9040988cc078	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:38.578+07
fe5f709a-e7df-41bf-b8f4-170f2e2fff5e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:38.584+07
7e883f2d-bf78-4e2b-89f6-5345ae4867c8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:38.589+07
e242e738-7520-43e9-a421-b7c3163e2489	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:38.595+07
2d1f7145-db29-499a-8e4b-993c651b1f3e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83f55947-d781-48ad-88ed-b85c74b82396	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:38.601+07
a5637706-be26-4fb3-981c-fadccb2644a5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:38.606+07
3b02c85c-d7d0-4601-8334-6faca6b9f6d7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:38.613+07
e574a5a4-0f1b-431d-aad4-89c72992646c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:38.618+07
85c48c4a-de79-4606-b9a6-a3de92629913	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:38.623+07
22205ba9-6dbb-41ee-80bf-dc2321ea55ce	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:38.629+07
40d156a9-031c-43c7-beac-361dcf552cdd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:38.636+07
a2f9039b-a8e3-4334-9761-8701d5d35883	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:38.641+07
33c3f9ff-f443-4507-95b6-f653f87b7ad3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:38.647+07
dabaa032-504e-48ad-97e9-5ea88773802c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:38.652+07
05125450-5e3b-4bd8-9a98-0082ebfec664	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:38.657+07
9c879ce1-ba57-4170-a691-396a78277010	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:38.663+07
267202d8-9ae4-4765-9e2d-b4c008581de0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:38.669+07
2b3d9cfd-e8f9-4400-bdd8-9f14d9a84f8d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:38.675+07
7ccc441c-320a-4631-ba33-90fdc9c9a8d2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:38.681+07
5db064d1-0494-4a6e-9b0a-f95ff38378e7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	f108d67c-7ac4-45aa-93db-c0946eb89872	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:38.686+07
ae630e8b-1a5e-4d66-a209-ea7cfb0ed899	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:38.692+07
ef897d6d-b3b7-47fc-b70b-b1d6d3e4745a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:38.698+07
bd3df91e-bccb-4b75-9704-b44ca292a89a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:38.703+07
a6a3f983-355b-4a2c-9934-0e0ad8bbd453	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:38.708+07
74cad5f4-bca8-463a-b4fe-1e1bb5d7d7ae	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:38.714+07
8510135f-3d54-4d71-b94b-cf44a6dff9be	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:38.72+07
446b2ac6-2327-4037-b77c-c6a4710db4e0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:38.726+07
9b437deb-bd16-4dbd-b394-a9c54b23c9e7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:38.732+07
4920f351-7d01-4b9c-ac28-820cfe1418e6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:38.737+07
6e2f1cc2-c15e-446d-9833-6033e0e26f67	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:38.742+07
9fa55c7f-b5b5-4ba1-bd51-c23981e3222e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:38.748+07
76151cdd-471c-40a3-afb8-f5020e72d425	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:38.753+07
475e7c84-4b01-4a98-b933-07d993e2ed05	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:38.765+07
cf7144e3-6769-4419-988d-831797b02291	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:38.771+07
630223c9-aacb-4de5-bf29-bfa95f77c724	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	af8b5452-6c59-4cd3-b18c-911deb15959d	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:38.777+07
2220e154-9b1f-4baa-877a-3b158c0ad69c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:38.783+07
d6146dce-5942-430d-9aa4-c8984110cc08	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:38.788+07
0aa1510c-b7a7-426e-93b0-173e57fd5602	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:38.793+07
12cae7b9-be54-4851-b001-5c718d4649ba	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:38.799+07
b599c215-b541-4be2-889f-12db7b497b17	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:38.804+07
40ea05bf-d9fa-468d-8f46-ed76f448757b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:38.811+07
1b6066a0-c050-4b41-b792-11371cc4381e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:38.817+07
18b73977-fe26-4470-9d9a-c5b74654b3dd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:38.823+07
15222381-9a53-4c97-97ac-442f3ece2dc7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:38.828+07
805c940b-50fd-450f-9747-3ea4d0c6f2e1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:38.833+07
f8fb6aa7-44ae-401a-bdcd-c28bb50245b2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:38.839+07
44b66145-8f4f-433d-9bab-c54c95c5a744	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:38.844+07
b524fa99-8cbd-4865-9dc4-0693044f620c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:38.85+07
7dd79f31-1721-48f1-88e9-00511b4b488f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:38.855+07
3a730890-309d-48a5-a96e-ccdf7476a17f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	6d0bc46c-4709-4c29-bc93-32dc2b59d299	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:38.861+07
faaee616-4e4d-4f0e-ac59-64e4ef9f7ad1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:38.866+07
e1def9d8-3d8c-4bec-8aa0-4b287af5b4ed	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:38.871+07
a7525515-efab-4a23-9949-8ec0eeff93eb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:38.876+07
a8f5533d-8207-4a03-986f-71f4efa121e1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:38.882+07
729e1ca7-603c-4369-94bf-c6e5f09a08c5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:38.887+07
14d87809-16de-4e55-933e-3274f8c6a23f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:38.892+07
93b61d14-2290-4ba5-a067-0bf4292a4d07	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:38.898+07
daac4bd4-3584-4801-8084-67af11cb0fc7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:38.903+07
c7f645e6-678e-48e2-ba6e-3670d2305e51	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:38.908+07
4453887b-3241-4f64-a158-52223d76a3c1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:38.914+07
3c1b69e5-d6f3-40d1-98b5-4a3907c1f7b8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:38.919+07
58cf2cd1-9c27-40ed-80b6-f64367d608b8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:38.925+07
8bb92fcc-3eab-4e77-992e-b4eede241728	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:38.931+07
2c1e4ab5-b931-4366-b993-b221e47414e5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:38.936+07
34c91fe2-feac-4f62-a89c-a9c21c89b00b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ffc5cf5a-5086-4341-81e5-11634bdde855	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:38.941+07
108bc366-ab20-4db0-b00c-7a4fc502323c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:38.946+07
a8beae3e-0914-4d79-ad3e-0c213433d983	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:38.951+07
b57499a6-8b48-4b72-b020-078287f10f23	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:38.956+07
376e5e1e-b248-40f2-994a-da8ea5572586	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:38.962+07
a827df58-a2c4-4bfc-a95a-faee8ee92fb5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:38.967+07
0bebbae6-faf2-4d74-a939-ee12464c93ea	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:38.971+07
9ea6a86d-7ac3-4077-a2dd-5c23175c06f7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:38.976+07
a9729e44-3040-44ef-a5fa-35565ce387df	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:38.983+07
ae62d385-fced-4d13-bd9f-0932d013d668	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:38.988+07
f583e10c-0813-416b-af20-f0cf2936f29e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:38.994+07
f2b4275c-d562-44b9-a652-d2592435d9ad	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:38.999+07
bf853f18-6a49-4093-82af-7126c821d28d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.004+07
15059f7c-8ca5-4a18-9b88-ae9f573d1138	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.009+07
65ead1b8-d926-4018-8e19-3196ea7ddcd6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.015+07
c052bb3f-9be7-4fc9-8cec-be6627042fe2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	91d6e928-54df-48b2-b507-9d9b59a6409a	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.02+07
15fb927c-7a9a-45fc-8a23-8b71c88c991f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.025+07
465d88ce-030e-4c08-af2e-b19e7b15d44f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.031+07
fb4d9d1d-4dd7-4753-8a3b-d526761f7e01	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.036+07
83330b3d-a688-4e20-b348-1d00253f4bae	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.041+07
6af374e9-ccc5-49ac-8107-c9223383f9fa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.048+07
266b5c4e-1bc7-4ec3-923c-c3a5273c315d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.055+07
397a5efb-c121-4e1d-b866-00dccd0ba0c9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:39.062+07
90dcada8-01c6-47c0-98aa-e1f7b2059901	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:39.067+07
bc73dbe3-6fb7-45f3-8f86-92ba95fa9768	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:39.073+07
be6efe59-f9ab-448d-87ee-32f28cc511a0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:39.079+07
1848821b-2d87-4c63-8188-6dad469d7480	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:39.084+07
0d2cc497-86a7-47cc-9a4c-f2b8e73264ca	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.09+07
cb454081-60fd-47c6-9d46-7f037e2ee662	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.098+07
6181ebb4-b7f1-48ac-a344-5e340295f887	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.104+07
e06fe7e9-7c36-453b-b992-a14c0583952c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	10de0ea3-b6e1-46c7-847f-8a5fa99effb8	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.109+07
400e7633-cdce-4e1c-8f52-5e64c428cf5d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.116+07
537fb6f7-451f-45b0-81ad-78473f41be10	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.122+07
cb74081c-723c-4aee-8547-9d4c2fd4b161	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.128+07
f688b49b-a148-4de4-88db-23d3afde7c09	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.132+07
9ceda0d5-2435-4ca9-81b9-51172f3ccc13	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.136+07
b7d868f6-6a92-486f-8091-23da7aef1650	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.14+07
2c25a5c2-62d5-4d91-a313-568cd2c957db	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:39.145+07
a6590a83-bc1d-4b5d-af5d-6ffc2b581d70	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:39.15+07
d2e47092-9e97-49fe-ad74-09d29a924ca5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:39.154+07
baac21c9-b06f-4ce4-ac5f-905fd4642df4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:39.158+07
029194e5-725d-4cfd-b0e0-e54e87402916	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:39.163+07
7fdbf750-8f7a-4c2b-9a83-f8e07c97ada0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.167+07
3488af5f-5c9a-4075-ab54-e681bb8d4a3a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.171+07
39b09e60-3abb-40b8-afde-dc7997393d87	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.175+07
fb465000-2492-485f-be27-864ce1c71406	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64ea5ccc-516f-4bcf-be56-c53b00311e0b	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.18+07
480cea95-c683-47d9-af98-b31d8e5e44d8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.184+07
ba49a120-d3d9-4aca-83cc-5ae6136a5e84	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.188+07
9932f49d-c9ed-4624-81b1-0153ec9c5326	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.192+07
ec7b0086-97db-4bd9-8022-3aca4395b7f4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.197+07
8aa180f3-422f-43db-9880-7d0755352c6d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.201+07
d000579a-b83b-4e66-bd9e-ca84cde08f46	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.205+07
9f884fcb-0a09-4bcf-8ad8-2ff471525075	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:39.209+07
5f443cbf-6b49-426c-9ccf-105f071350db	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:39.214+07
9b1fcb55-3db3-410a-b681-be9ce8755309	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:39.219+07
229f47da-8e17-4238-ab79-5fa9f5c9f76a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:39.223+07
a70278c8-ff1f-4fad-a9e0-978cfa7c0d7d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:39.228+07
76855122-09d1-405f-8e78-b8155aa1b34e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.232+07
35ecd5f8-3234-4e32-aff7-f78e85a90272	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.236+07
7a09dbaf-80bb-486f-8f54-f0ccc350872a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.241+07
9f9dc9b8-5011-4e29-b9cd-86c0041408e9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b6d32800-52d3-4fc4-a452-169086fe3ea8	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.246+07
5507aee1-3486-40ef-a96c-a143d0285cc3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.25+07
eff0f8f3-d475-44a3-a0c1-f2457b287725	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.255+07
1eb27d74-9db1-4f2d-8160-690d2bcdde76	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.259+07
9a9795e8-61f0-48ea-9df0-0d635b042bd5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.263+07
9e4c7ae5-d0a5-47ba-89bd-b1c80d6036da	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.268+07
9b792038-21dc-4c47-82e5-52a27338810d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.272+07
1250568b-017c-4673-a381-f21c6949bb62	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:39.277+07
98eb5679-6847-48cd-a133-9809c3f69e16	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:39.282+07
0afa2262-9dae-4410-ab31-4f99dbde019c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:39.286+07
44a0d2bd-3be1-430e-91c0-d38a57f86235	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:39.291+07
a5b7f80e-0a20-40dd-a56c-234c870f9087	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:39.297+07
3228cae7-8819-4f0d-b2f6-6874163d3359	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.302+07
f0afbbd7-2e0b-496f-aa7b-13a1bede2196	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.306+07
e745265e-2652-42ff-9c85-f89870a3b403	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.311+07
9566ee4a-41b2-42f7-8e54-ed232b458ec5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a93bc421-5ea8-47e4-b886-bc8e5266fde3	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.315+07
2f86f39e-5043-4e52-bf71-20592aae9daa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.319+07
af076081-96e0-49ee-ad9a-176addb8be38	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.324+07
74812089-c4b5-41e0-8ad8-e33caaa82ce9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.329+07
d8c98306-0a4b-4c8e-8ecd-d9616f8fe59b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.333+07
950ece24-a19c-4ba4-8322-5773ceafd94c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.337+07
b80f2a55-4513-4ee7-9366-ecc9e87ff93c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.341+07
40ef4041-9984-4ffa-97a6-13303e5ced98	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:39.345+07
27e3f62a-b1e2-42a9-adec-3ee291965a10	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:39.35+07
a4c8004c-8584-486a-bda3-e2c38b5c0502	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:39.354+07
c74b39c9-2c3e-4e82-a992-16211d8a2fa4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:39.358+07
b288e163-2174-47f6-9680-1135c6ffbff1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:39.363+07
47e51e1d-c976-45fb-a364-e62f9e749ede	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.367+07
88cfed07-495b-45d5-bcd1-fab09475ed63	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.371+07
6f34b3d6-286e-4f10-a5f8-2ceb3c8d54cd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.375+07
04064be6-c1c8-49ce-b6bd-73ffaf77045e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	20842ac0-2da2-46a3-9412-f81b587ab762	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.381+07
de2d283b-f96b-42b8-b714-cf8f6a6824aa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.385+07
e300e478-46c8-419a-a1d4-f2e8b4dbddea	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.39+07
be987206-58b2-4486-8a56-12047087a280	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.395+07
7b492fc7-de0a-4aa7-b071-9dca241c7ecc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.399+07
a83191d1-172c-44a6-9e5d-a2af65e6eb3f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.403+07
bc951c62-0b85-4c39-b62e-ed7924b2c560	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.41+07
f2aad38e-c5db-43d1-9515-10731ac2bf2f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:39.417+07
1c6c6047-cfeb-4264-b21d-e4a8769972c9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:39.421+07
b65e6e63-56ba-4d23-9a5a-0bed6aab78f6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:39.425+07
f627a324-30b6-43f5-a24e-52fdbd96cd7c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:39.43+07
bf980d4f-cf38-4cfa-abf9-ee3fe50283f3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:39.434+07
bbd2777a-e267-4cdf-bb6c-5ae263c4a2f2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.438+07
d951b5e9-4436-4066-94cc-8eecbb586ac8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.442+07
37a04e68-6382-410f-8222-bc71c05a6fef	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.447+07
b24a4994-c61f-4251-a5cc-a8715834fa90	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	28aa324e-d56b-42d7-9cc6-7d83eac27515	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.451+07
47d58162-4eb7-4682-91ea-0dc53a89825b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.455+07
ac05ade8-424c-4c0a-8e4f-0bc63d325cdd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.459+07
135c9e63-bbb0-4b1b-9b71-747c52c8a1e5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.465+07
a607db01-d337-461f-97c7-5a6e2dbeee98	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.469+07
be20769a-30b5-426e-ba2b-3a588d18a12e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.473+07
0924277c-edda-4b29-ac82-2d89de9c149d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.479+07
d22ff090-4861-4638-8e43-5d98117a8d17	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:39.483+07
dfeb41ce-7949-4a9c-8123-9c04026643b4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:39.487+07
e3d333b6-573f-4848-89c6-076810f7a995	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:39.491+07
8227e576-6368-42e2-9af7-10b61d7a370a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:39.497+07
6a09b252-86c7-4189-9927-6fdb090d294c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:39.501+07
27e7104c-0672-4ab7-9a2c-48cafd617c1f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.505+07
8aa165ce-ae9e-441c-a3bf-bc9cf1bbee25	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.509+07
f9a4acde-120f-4dc3-9339-33bff2eda593	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.514+07
0bd88583-e437-4c45-8f0b-79933216d1f6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.518+07
b67ab0f3-82b4-407a-a98f-9a5ef8810294	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.522+07
9e19f9ea-ef10-4dad-9436-f3d4b26ed4f0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.526+07
1e15deff-884e-4563-846b-76261c0c6c67	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.531+07
23a907fd-c1e0-4091-93b3-f617328ec5a8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.535+07
4ad3bd0e-e32e-445d-ab82-7b85ef80d6f3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.539+07
a702091d-16a1-4d76-961b-39c1430aa123	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.544+07
e56d65ee-7dea-48ff-9bd0-defa4a9b90a0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:39.548+07
33072d9b-d56c-4743-af15-ad3c2b9ab1ce	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:39.552+07
8edfbbb1-7c1d-4daa-a429-24dc771f4d22	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:39.556+07
2e2797e8-b30b-440e-b64b-9c4571dcbd15	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:39.56+07
dcdcd917-0371-4f5b-9cfc-5c2f9f6e3011	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:39.565+07
91bd1c24-6353-44e3-89a9-e2c5681b62de	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.569+07
094b9f9d-9b15-47c7-be5d-9a3dc30e9197	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.573+07
61ae585e-cb6f-4b22-9298-7f7997f438a9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.578+07
8502b1c2-4f0d-4b34-acff-e8f78ea56539	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	3a9f315e-82e1-4f05-a124-2eb8748a28b9	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.582+07
721180ac-2598-4c44-8e12-fcbfb68943e3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.586+07
8afb4c20-e966-4d32-8fe6-7503776a0384	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.59+07
dd82d47d-467c-40c4-8525-3fa97406589f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.595+07
de9ad556-5087-4c89-8b79-7f7a0df55b6b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.599+07
26fc3ad2-288b-466a-a451-cf2715e38003	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.603+07
e8d58e0f-f5f1-4688-880c-f0877e75525e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.608+07
5867c0e3-3099-4aa0-b650-70eaad7d88f5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:39.613+07
26ff3668-a404-4ff8-90a3-11ee54a15b50	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:39.618+07
f720ff2c-616c-4bfa-b44b-d1a6b0d93513	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:39.622+07
27a175a7-804a-47e6-807b-3e82e0f1315f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:39.626+07
bbedb8dd-635a-4ad3-b73e-930e7c18d1f0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:39.631+07
8bfae8d9-d5aa-452d-9a6d-a00d5c36f4ec	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.635+07
f69c8b46-406b-488b-9c60-30b6b6b8c578	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.639+07
86814dc0-0962-40ce-81c3-4332f087a5a5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.645+07
4ec9d1bb-b908-45ad-9c75-3541c217fa64	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	a9013d28-7b6d-475b-8b6c-ce3ecef400f3	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.651+07
26aefb48-f142-416d-9449-0a7ff5b54e9d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.655+07
d95e945a-4f2d-4777-a93c-de8381c84d96	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.66+07
130e5d5d-3424-448e-ac75-288d25e5c9ef	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.665+07
0726b777-1914-48a5-98d7-d3f0a3db0a50	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.671+07
58e85c18-695a-4000-b2ce-8bb08d7a6167	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.675+07
51caf105-6220-4c0e-bb76-ae76a578e4c1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.682+07
c41d531d-3bc8-484f-8e6c-1be5641a2500	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:39.687+07
a57c3957-7fb7-41ca-a2d0-fc46cf82680a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:39.691+07
a6355e1e-161f-4d84-b9c0-d8845e43cc58	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:39.697+07
93ad06c7-7d6b-47a2-941e-8a491459310a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:39.701+07
706d4799-5f63-4817-8057-1f17a8a5fbc7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:39.707+07
ec79a706-e95e-4caf-baf8-5c4437282fb2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.712+07
a8be67bc-7c4b-4ed5-9ea9-2251286c809c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.717+07
462d19b2-6341-46f3-91d2-11dc4312c09a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.722+07
5d35f268-f0d5-4dae-b689-7bf6fd85b60e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	e5d6702e-7195-4e52-91ff-44d9ce67b414	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.727+07
f5fde48e-0435-4130-a1a5-ac1a3d961221	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.733+07
17a120e8-e38c-4fa7-9903-789f18709d3e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.737+07
806d7e33-e709-46a2-97ec-47acaa32f591	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.742+07
26f79a7c-7b1a-40a6-a178-ec097265c578	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.747+07
fe4c20a6-1d10-4b22-845b-5fc5a95141a4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.752+07
be9a7534-09bc-4259-bb27-169347d2d58b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.757+07
0c1437ad-7576-4bd8-ba14-15acb2bc89b5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:39.762+07
cfef66dd-c07c-4193-aa3d-a3053106d212	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:39.766+07
7e6a5717-edef-4446-8f93-6060bb76462f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:39.771+07
45a0686a-ab2d-4a5f-b63c-beda0c5c99e8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:39.787+07
11512721-2dce-47d0-bbb2-f1babaa2b4b0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:39.792+07
ccb5b9d6-2d22-4776-9b07-a4ef42779c71	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.798+07
408e7e6e-4546-47e3-be85-dd956f8e6b8d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.803+07
882fcaf2-1d82-48a7-a2de-9fc6810f7fd2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.808+07
4ac6611d-39ef-4c94-9c86-f8c4efe41236	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	82642422-0fb8-47ff-b6aa-82b60a2536bb	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.814+07
4087c823-592b-4150-94c0-7d18145509eb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.819+07
ad8a8981-b168-46c6-8fd1-74827ab3cc37	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.823+07
6b33b1ff-012b-4f96-9cbe-876c9a9719de	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.829+07
7190b21d-1b6b-4a67-a5b7-aefb1202c563	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.834+07
78897f58-81c0-4ec0-b00c-e86b1a9b155f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.838+07
0a0dde65-9525-4b91-bbcd-b25534c31d49	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.843+07
4dd45bf2-708b-46a6-a567-5ab3e7e27920	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:39.848+07
57083373-9222-47ac-88ec-131a49d7e7a8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:39.853+07
ec66b073-4a24-4d37-8588-086fc4aaaf50	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:39.857+07
1c460eed-0379-4da1-9d02-631d177224f1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:39.862+07
445a4b59-bbe5-4703-803d-f0fd4da97e59	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:39.867+07
41654304-d061-48c6-a7dd-894816b613f6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:39.872+07
d2b2d01e-f63a-462c-baf6-00ba26ee4638	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:39.877+07
a6d48446-f902-4bba-b4f1-2187392ad24b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:39.882+07
111f9222-dbfe-41f0-bb7b-4c358e4b4813	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	83c427cd-538d-4483-9f26-0409efda2abb	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:39.888+07
b36b8aec-9f73-4f13-aadd-3b193fe7fca0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	97b50dad-b641-4dea-b574-1c1b5bf5741c	2569	1	2026-10-22 08:33:39.892+07
c6080432-7ff9-4946-a563-f69b15ffc010	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	923e0b6d-de11-4e13-8cd8-229bdc994336	2569	1	2026-10-22 08:33:39.899+07
e8ad1cda-e398-4983-a242-ab46d40d2d78	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	a7ffe522-9a71-4f7c-80e2-0c6d5f3de06f	2569	1	2026-10-22 08:33:39.905+07
1d247de1-9e85-4ae7-b9d8-e4b164213db3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	99d04e16-1f07-4c3b-992a-cf6027225d67	2569	1	2026-10-22 08:33:39.91+07
c54c85a3-0d0d-43a9-8ba3-604badcd3a05	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	d7f233b6-d9fe-42e8-bcdc-d345e123751c	2569	1	2026-10-22 08:33:39.915+07
ad12cf2f-01b1-4a55-8957-08faef898ba2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	97b50dad-b641-4dea-b574-1c1b5bf5741c	2569	1	2026-10-22 08:33:39.92+07
d80d8154-31e7-4c57-bc9e-60e380bdbf10	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	923e0b6d-de11-4e13-8cd8-229bdc994336	2569	1	2026-10-22 08:33:39.924+07
6b4a52df-4f61-447c-88e3-57bb9a887a2a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	a7ffe522-9a71-4f7c-80e2-0c6d5f3de06f	2569	1	2026-10-22 08:33:39.93+07
87215b00-83c1-4e3e-98e2-0766cbf587fa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	99d04e16-1f07-4c3b-992a-cf6027225d67	2569	1	2026-10-22 08:33:39.935+07
2fef0234-0c8f-4e05-aa4c-eaf98ce4b540	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	d7f233b6-d9fe-42e8-bcdc-d345e123751c	2569	1	2026-10-22 08:33:39.94+07
3b5a5df7-5240-4fa3-b07f-ca657b958b0e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	97b50dad-b641-4dea-b574-1c1b5bf5741c	2569	1	2026-10-22 08:33:39.945+07
98fe4ce4-20a0-4033-aef2-1e1e528ecb0a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	923e0b6d-de11-4e13-8cd8-229bdc994336	2569	1	2026-10-22 08:33:39.951+07
e3791324-38b1-4d83-9ef7-8fd1fff4e6e9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	a7ffe522-9a71-4f7c-80e2-0c6d5f3de06f	2569	1	2026-10-22 08:33:39.955+07
f3a42f0e-0553-4857-a060-5bdbbe0084dc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	99d04e16-1f07-4c3b-992a-cf6027225d67	2569	1	2026-10-22 08:33:39.961+07
c0290b66-bc13-4580-a07d-2c0842f5eefe	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	d7f233b6-d9fe-42e8-bcdc-d345e123751c	2569	1	2026-10-22 08:33:39.966+07
a34b4581-53ae-4071-8393-f12885b9c495	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	6c7a7261-4c54-461a-8d41-ac03411f930e	2569	1	2026-10-22 08:33:39.971+07
39f36eb7-69c4-4411-b5b2-c559500e0763	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	5672f0fc-cb74-41d3-a754-f0f86372992b	2569	1	2026-10-22 08:33:39.976+07
ce3afd90-69bd-44a9-a1f6-5da770e61511	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	0bd1534e-9935-46b6-807e-2e374316481f	2569	1	2026-10-22 08:33:39.983+07
1645ba79-0d6b-447f-af11-9f161cedab21	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	2569	1	2026-10-22 08:33:39.987+07
0e2d7251-82fd-4452-86c8-3a1c1e4b990c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	df6b6d81-270e-4462-ac95-e22e5f9aae5a	2569	1	2026-10-22 08:33:39.992+07
b1ef1138-f833-445a-8a04-91a4c5bb1f3e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	e30d1b81-7093-4398-a6b1-a6a0415fbdf6	2569	1	2026-10-22 08:33:39.998+07
5025cc60-77f0-43aa-acbe-6b23ea18353d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	c768a99a-51a0-48a9-8528-33bd9b8bde67	2569	1	2026-10-22 08:33:40.002+07
49e88705-43f6-47f2-b490-071d7b9b36fb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	3a6990cb-71f3-4905-aadc-327a579d833f	2569	1	2026-10-22 08:33:40.008+07
870c46fc-e531-49c5-8e87-1c5fb24b5caa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	b49fe103-3358-4df1-b278-7402ea155ad0	2569	1	2026-10-22 08:33:40.013+07
55f7b82b-fae7-4931-a988-15b4514379b3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	b01c5cd7-dba8-410b-a481-497c17060016	2569	1	2026-10-22 08:33:40.018+07
78d5c90f-429d-4907-8149-f047a7fbfd15	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	c3b8b194-f1d3-438a-9a0d-b6a3830100af	2569	1	2026-10-22 08:33:40.023+07
745647bc-21eb-473a-b054-7e97acb41142	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	8b71007e-0e5a-4d7d-b692-9704c80286fc	2569	1	2026-10-22 08:33:40.028+07
9d255050-b10f-423f-bc0c-0b785f376de0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	0817447d-f9ea-498a-a528-c4c385f7b60e	2569	1	2026-10-22 08:33:40.032+07
1768a9f8-4cde-4d29-a732-b8f8d69cc325	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	f24e501d-04de-4f98-b5e4-5b3e617e31da	2569	1	2026-10-22 08:33:40.037+07
589e17c3-fcd6-4aec-bffe-864076b2690e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	c2dcc219-51d1-4b20-b10d-0808db77d4a3	2acdb632-f0fe-4487-a3db-c082c2d993a5	2569	1	2026-10-22 08:33:40.042+07
c9fefe4a-aaad-432f-94e2-d3f1aa1d3423	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	85930f90-8554-4794-89aa-b09ee09372b8	2569	1	2026-10-22 09:02:20.922+07
20daa292-0bc4-40a6-884d-42e9ee36ecde	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	85930f90-8554-4794-89aa-b09ee09372b8	2569	1	2026-10-22 09:02:20.922+07
5ed6cc2b-9d59-42ee-9462-f9a401b6fd78	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	85930f90-8554-4794-89aa-b09ee09372b8	2569	1	2026-10-22 09:02:20.922+07
32a380d9-7f80-4161-96d2-aae43dbf0e4c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	9053460e-009e-4db1-a322-5e9e909b258a	2569	1	2026-10-22 09:03:34.708+07
31c9a62f-b7bb-4814-ba78-b3c4d32a827a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	9053460e-009e-4db1-a322-5e9e909b258a	2569	1	2026-10-22 09:03:34.708+07
e6c18709-3ef9-452d-836d-cc19d7966e69	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	9053460e-009e-4db1-a322-5e9e909b258a	2569	1	2026-10-22 09:03:34.708+07
806de117-b76c-4a70-a302-5b92ead39751	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	e1c65ac4-9bfe-4780-a07a-38ebf3db35e5	2569	1	2026-10-22 09:04:21.752+07
8fd596d1-2dab-4ac0-961e-ac79026c772d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	e1c65ac4-9bfe-4780-a07a-38ebf3db35e5	2569	1	2026-10-22 09:04:21.752+07
b46e650f-09a1-4372-9ef3-d24db89a6e36	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	e1c65ac4-9bfe-4780-a07a-38ebf3db35e5	2569	1	2026-10-22 09:04:21.752+07
e14a08cb-900b-4949-9ab1-4e3453bc91df	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	704c0570-566f-4146-8b59-d3dcba9e67c2	2569	1	2026-10-22 09:05:30.404+07
1975e250-8a1e-4d0e-9fc4-eac4039265c2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	704c0570-566f-4146-8b59-d3dcba9e67c2	2569	1	2026-10-22 09:05:30.404+07
06693f03-f74c-4386-919f-604ede05d7e1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	704c0570-566f-4146-8b59-d3dcba9e67c2	2569	1	2026-10-22 09:05:30.404+07
d857fbfa-81fd-4ab2-b9ae-45003f17a801	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	ca10d8c1-eb30-4e4b-8537-75444b6d5b68	2569	1	2026-10-22 09:06:05.473+07
cddc70e9-6865-40be-b85f-266ae5ef40fb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	ca10d8c1-eb30-4e4b-8537-75444b6d5b68	2569	1	2026-10-22 09:06:05.473+07
a1c6460e-2ad2-43e8-a3ad-7496b3f10bdf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	ca10d8c1-eb30-4e4b-8537-75444b6d5b68	2569	1	2026-10-22 09:06:05.473+07
d7fb909a-637d-4d44-a41f-f01886fd214e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	cc9f0168-ff7b-4b17-9269-3c62217cc41f	2569	1	2026-10-22 09:07:10.74+07
a14ad1bc-91eb-478f-bafc-60927d5f6731	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	cc9f0168-ff7b-4b17-9269-3c62217cc41f	2569	1	2026-10-22 09:07:10.74+07
23060a5d-aa21-41ad-af80-ec3d908c2f7b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	cc9f0168-ff7b-4b17-9269-3c62217cc41f	2569	1	2026-10-22 09:07:10.74+07
a6b9aaef-2298-4506-b315-9fed59ef4314	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	280acafe-eb5d-4d02-8cd9-67a5ef970ccc	2569	1	2026-10-22 09:08:22.323+07
a0952f79-346b-4c5f-bf68-b41db98cecbe	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	280acafe-eb5d-4d02-8cd9-67a5ef970ccc	2569	1	2026-10-22 09:08:22.323+07
b1c26ad7-04dd-40f0-be36-ffbceec229ad	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	280acafe-eb5d-4d02-8cd9-67a5ef970ccc	2569	1	2026-10-22 09:08:22.323+07
2266a922-19be-42bd-a619-236bb46662a0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	b0f3debf-eb29-4c00-bf90-133f670704b5	2569	1	2026-10-22 09:09:16.297+07
ae2f450d-8e1a-44a5-b6aa-03f81f30dff0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	b0f3debf-eb29-4c00-bf90-133f670704b5	2569	1	2026-10-22 09:09:16.297+07
f5fde6a1-da61-4d9f-b3b2-852347ce657c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	b0f3debf-eb29-4c00-bf90-133f670704b5	2569	1	2026-10-22 09:09:16.297+07
c384bc3c-d93f-4e70-9445-4ec32f17aad0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	9da7b135-667a-481b-981f-5acf55a84a6f	2569	1	2026-10-22 09:10:15.374+07
d1f81dde-2098-4a4b-b28b-45c08460bd82	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	9da7b135-667a-481b-981f-5acf55a84a6f	2569	1	2026-10-22 09:10:15.374+07
e0c319f4-2406-4fb4-aea5-fb1b16377791	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	9da7b135-667a-481b-981f-5acf55a84a6f	2569	1	2026-10-22 09:10:15.374+07
63cd2107-3c9f-47ae-bec6-b104fe815df1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	b7bb2c30-effa-4016-9ba3-3519d3eae188	598c4894-8f92-4ea6-b4c6-7f5386c5d0c3	2569	1	2026-10-22 09:12:25.64+07
466251fc-7894-4ab2-9f16-8b579c82da8e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	963fa502-7291-4568-bbd0-4c2a272173a0	598c4894-8f92-4ea6-b4c6-7f5386c5d0c3	2569	1	2026-10-22 09:12:25.64+07
1fbde558-2974-472b-bfe1-3168afed47fb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	07d2cd46-ca01-40d7-b321-9702f46c34fa	598c4894-8f92-4ea6-b4c6-7f5386c5d0c3	2569	1	2026-10-22 09:12:25.64+07
b0f209df-cadd-4848-8602-5abd021b1928	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	a7ffe522-9a71-4f7c-80e2-0c6d5f3de06f	2569	1	2026-10-22 09:51:55.025+07
96f9bee3-9498-479b-8631-d8baabee4cad	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	923e0b6d-de11-4e13-8cd8-229bdc994336	2569	1	2026-10-22 09:51:55.025+07
0cacfee1-9f57-4d68-bb8c-edd2186eeed8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	99d04e16-1f07-4c3b-992a-cf6027225d67	2569	1	2026-10-22 09:51:55.025+07
6125cf48-18a3-4f4b-8e92-b66da05505f1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	d7f233b6-d9fe-42e8-bcdc-d345e123751c	2569	1	2026-10-22 09:51:55.025+07
fdfc5ac7-5713-4797-9912-6bd2425de4bc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	97b50dad-b641-4dea-b574-1c1b5bf5741c	2569	1	2026-10-22 09:51:55.025+07
ed4ee19c-dcb5-4075-a3db-d1db1194051e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	85930f90-8554-4794-89aa-b09ee09372b8	2569	1	2026-10-22 09:51:55.025+07
cd96ece6-b25d-4dbd-81b8-686937d51aa4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	9053460e-009e-4db1-a322-5e9e909b258a	2569	1	2026-10-22 09:51:55.025+07
ba4f20cd-f80e-429b-a0cc-1d2e58a035ba	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	e1c65ac4-9bfe-4780-a07a-38ebf3db35e5	2569	1	2026-10-22 09:51:55.025+07
1af3fee7-7535-48fb-abda-16f031e5a1e8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	704c0570-566f-4146-8b59-d3dcba9e67c2	2569	1	2026-10-22 09:51:55.025+07
af823bb7-01cd-4958-95c7-90a3cd6df06a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	ca10d8c1-eb30-4e4b-8537-75444b6d5b68	2569	1	2026-10-22 09:51:55.025+07
02cc3f95-9501-4ca3-b2fe-83dbf178e7e4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	cc9f0168-ff7b-4b17-9269-3c62217cc41f	2569	1	2026-10-22 09:51:55.025+07
c7de1f56-42c0-47b8-a7b3-34fe19592bd4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	280acafe-eb5d-4d02-8cd9-67a5ef970ccc	2569	1	2026-10-22 09:51:55.025+07
a9664373-8d02-41df-aa6f-254e251d9bb3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	b0f3debf-eb29-4c00-bf90-133f670704b5	2569	1	2026-10-22 09:51:55.025+07
9463c12d-547b-463b-93dc-101f21f053c3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	9da7b135-667a-481b-981f-5acf55a84a6f	2569	1	2026-10-22 09:51:55.025+07
40b4d0b3-a022-404e-a2a9-cf8e97ebe472	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	dbdb2e53-070f-4612-b197-d075c58cc138	598c4894-8f92-4ea6-b4c6-7f5386c5d0c3	2569	1	2026-10-22 09:51:55.025+07
e4748d2f-49eb-4e3b-9d78-0b537f6c18c5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	a7ffe522-9a71-4f7c-80e2-0c6d5f3de06f	2569	1	2026-10-22 09:51:55.041+07
4b758a68-3951-4b81-9c95-8eb7edbb9831	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	923e0b6d-de11-4e13-8cd8-229bdc994336	2569	1	2026-10-22 09:51:55.041+07
459e7ec7-1c02-4a24-94f1-167c0d6031b8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	99d04e16-1f07-4c3b-992a-cf6027225d67	2569	1	2026-10-22 09:51:55.041+07
5add823d-00eb-4414-8e06-9dad047aa0df	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	d7f233b6-d9fe-42e8-bcdc-d345e123751c	2569	1	2026-10-22 09:51:55.041+07
7b62ef5e-e619-47fe-9f3b-1666c66fb32c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	97b50dad-b641-4dea-b574-1c1b5bf5741c	2569	1	2026-10-22 09:51:55.041+07
ad863428-561e-4a90-81b1-2f3b732f68f8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	85930f90-8554-4794-89aa-b09ee09372b8	2569	1	2026-10-22 09:51:55.041+07
02484c43-4c83-41bd-b5f7-1d823eeb0353	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	9053460e-009e-4db1-a322-5e9e909b258a	2569	1	2026-10-22 09:51:55.041+07
6d46db2e-b4cb-43d7-a1b3-7c8139a5dd92	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	e1c65ac4-9bfe-4780-a07a-38ebf3db35e5	2569	1	2026-10-22 09:51:55.041+07
95b3192e-24e4-49b2-8b88-f609fc4fda66	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	704c0570-566f-4146-8b59-d3dcba9e67c2	2569	1	2026-10-22 09:51:55.041+07
3ae59ef3-42e9-41e2-ba0a-3b7c3e4bb8e0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	ca10d8c1-eb30-4e4b-8537-75444b6d5b68	2569	1	2026-10-22 09:51:55.041+07
cbbab563-459e-4100-b61d-320209ac9849	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	cc9f0168-ff7b-4b17-9269-3c62217cc41f	2569	1	2026-10-22 09:51:55.041+07
d3d02373-8a7c-4100-997c-e48037981ea2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	280acafe-eb5d-4d02-8cd9-67a5ef970ccc	2569	1	2026-10-22 09:51:55.041+07
764fad58-e10a-41a3-b001-1ed86ea94d57	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	b0f3debf-eb29-4c00-bf90-133f670704b5	2569	1	2026-10-22 09:51:55.041+07
6dca2180-39f3-4abd-8e17-a1708bb7c90b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	9da7b135-667a-481b-981f-5acf55a84a6f	2569	1	2026-10-22 09:51:55.041+07
6ae91ff0-e3c6-4055-a27a-339595fa6ee5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	565387f8-adba-45ab-9f39-19515556215c	598c4894-8f92-4ea6-b4c6-7f5386c5d0c3	2569	1	2026-10-22 09:51:55.041+07
7e2dd5bb-776e-4479-8b10-4b7e76260fb9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	49ec97d5-dd51-4a60-812e-d6b8b2cc637d	2570	1	2026-10-22 09:55:39.508+07
21697d66-640a-48e9-be1d-709bae4d114d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	49ec97d5-dd51-4a60-812e-d6b8b2cc637d	2570	1	2026-10-22 09:55:39.508+07
dc9f593e-6ad4-4c6c-947e-9a5568fd7da2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	49ec97d5-dd51-4a60-812e-d6b8b2cc637d	2570	1	2026-10-22 09:55:39.508+07
7075d8ed-191f-40b0-a74b-469574b9344b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	49ec97d5-dd51-4a60-812e-d6b8b2cc637d	2570	1	2026-10-22 09:55:39.508+07
95c32e41-17b6-4d24-b4e1-5c618522206b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	49ec97d5-dd51-4a60-812e-d6b8b2cc637d	2570	1	2026-10-22 09:55:39.508+07
14fa80c9-9eec-4112-a6f9-e1a5c5bbb9ad	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	8bd1bc11-8708-4581-b0a1-936c4d1dd7c2	2570	1	2026-10-22 09:55:39.544+07
1fb22266-2eb0-43e7-ae4f-1f6c5c8afa34	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	8bd1bc11-8708-4581-b0a1-936c4d1dd7c2	2570	1	2026-10-22 09:55:39.544+07
c6e78e97-d742-4430-8759-5c185bdca7ed	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	8bd1bc11-8708-4581-b0a1-936c4d1dd7c2	2570	1	2026-10-22 09:55:39.544+07
ce50ec8c-070e-4580-9521-8bb2fa5334e8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	8bd1bc11-8708-4581-b0a1-936c4d1dd7c2	2570	1	2026-10-22 09:55:39.544+07
8f1dc7e1-3add-41d1-b27f-105d393f51da	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	8bd1bc11-8708-4581-b0a1-936c4d1dd7c2	2570	1	2026-10-22 09:55:39.544+07
3e18743a-8d98-4143-9540-573c85000207	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	b89e8c2b-de0f-4d8e-83cc-95088e654675	2570	1	2026-10-22 09:55:39.568+07
0257ed10-5c3b-4d5f-85fb-b5132b23a85a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	b89e8c2b-de0f-4d8e-83cc-95088e654675	2570	1	2026-10-22 09:55:39.568+07
9d6a5de6-f46a-439a-9fd2-327041e221cf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	b89e8c2b-de0f-4d8e-83cc-95088e654675	2570	1	2026-10-22 09:55:39.568+07
aebc1851-aa2b-42a8-95fc-512adb9384ff	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	b89e8c2b-de0f-4d8e-83cc-95088e654675	2570	1	2026-10-22 09:55:39.568+07
3b456733-b2e3-4b94-b62c-57a7a0dc3748	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	b89e8c2b-de0f-4d8e-83cc-95088e654675	2570	1	2026-10-22 09:55:39.568+07
00ef37ce-d1be-448b-a71a-fca8d8d902c7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	2bcdb223-2efb-434a-8b9a-ce3ed3f46f2b	2570	1	2026-10-22 09:55:39.592+07
410d13a9-9b05-4ba8-89fb-699a5dc42397	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	2bcdb223-2efb-434a-8b9a-ce3ed3f46f2b	2570	1	2026-10-22 09:55:39.592+07
1a1ef946-437c-4679-ab7c-6ecd14205be9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	2bcdb223-2efb-434a-8b9a-ce3ed3f46f2b	2570	1	2026-10-22 09:55:39.592+07
4d0d9eea-fa40-4cc7-ba6a-0e05029dccbd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	2bcdb223-2efb-434a-8b9a-ce3ed3f46f2b	2570	1	2026-10-22 09:55:39.592+07
115a2b61-6b84-4a3b-a76a-5049eb48a131	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	2bcdb223-2efb-434a-8b9a-ce3ed3f46f2b	2570	1	2026-10-22 09:55:39.592+07
1d67639b-87e4-4ae1-8174-4132f030218a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	10dd56c3-ca82-4fe0-8329-99ef7b11feca	2570	1	2026-10-22 09:55:39.615+07
0f1bfbfe-7182-4d3c-b856-8ccb4611fd44	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	10dd56c3-ca82-4fe0-8329-99ef7b11feca	2570	1	2026-10-22 09:55:39.615+07
5bb3fe38-49e5-401b-a5ff-58703751fc9d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	10dd56c3-ca82-4fe0-8329-99ef7b11feca	2570	1	2026-10-22 09:55:39.615+07
d078ec51-cabf-43f7-97d9-ee18035c571f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	10dd56c3-ca82-4fe0-8329-99ef7b11feca	2570	1	2026-10-22 09:55:39.615+07
84609980-7bea-4fea-a59e-cb294b7e3057	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	10dd56c3-ca82-4fe0-8329-99ef7b11feca	2570	1	2026-10-22 09:55:39.615+07
01cc728b-b2f8-4073-93a5-cc29ba0cfa80	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	82ef3f3f-6b72-40f7-9941-768dff0ece74	2570	1	2026-10-22 09:55:39.64+07
b585d8c4-bd81-4774-89e4-36fddf3e284d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	82ef3f3f-6b72-40f7-9941-768dff0ece74	2570	1	2026-10-22 09:55:39.64+07
900ab302-53dc-4a82-8276-826c48152ce8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	82ef3f3f-6b72-40f7-9941-768dff0ece74	2570	1	2026-10-22 09:55:39.64+07
e171b9d1-17d8-492a-8599-5645e97e8cd3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	82ef3f3f-6b72-40f7-9941-768dff0ece74	2570	1	2026-10-22 09:55:39.64+07
a6858a13-6279-4f3d-9123-860005c75083	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	82ef3f3f-6b72-40f7-9941-768dff0ece74	2570	1	2026-10-22 09:55:39.64+07
2d0950fe-cba1-4883-b6c9-61e66b069655	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	c78a0115-968d-4f00-b769-d425cf755b10	2570	1	2026-10-22 09:55:39.664+07
c9a0c1b1-e2da-4a6c-8aba-82b24e4eb911	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	c78a0115-968d-4f00-b769-d425cf755b10	2570	1	2026-10-22 09:55:39.664+07
c1bcedaf-11f6-47c1-9ef3-f94d76a3eec5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	c78a0115-968d-4f00-b769-d425cf755b10	2570	1	2026-10-22 09:55:39.664+07
1fd0bb44-91b0-4ae4-835b-da45f9e83887	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	c78a0115-968d-4f00-b769-d425cf755b10	2570	1	2026-10-22 09:55:39.664+07
de48d838-8028-4f1d-b5af-a203bf29962c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	c78a0115-968d-4f00-b769-d425cf755b10	2570	1	2026-10-22 09:55:39.664+07
6262528b-27f8-4212-bf5a-1e420cafba80	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	9d04a493-7604-4b96-9f5c-4702d63b4f2d	2570	1	2026-10-22 09:55:39.688+07
2f112ba4-697f-4da3-a13e-e5585dc1c1cc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	9d04a493-7604-4b96-9f5c-4702d63b4f2d	2570	1	2026-10-22 09:55:39.688+07
349f6505-fdf0-4b68-ad4f-d13642b26491	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	9d04a493-7604-4b96-9f5c-4702d63b4f2d	2570	1	2026-10-22 09:55:39.688+07
ae7a8e73-decb-4647-a129-ef4ab2a8f85e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	9d04a493-7604-4b96-9f5c-4702d63b4f2d	2570	1	2026-10-22 09:55:39.688+07
8d4681f2-0c27-46d4-afc6-4351125e4b37	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	9d04a493-7604-4b96-9f5c-4702d63b4f2d	2570	1	2026-10-22 09:55:39.688+07
a1c6e5f0-c8d2-47a7-82b3-e59925fd655c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	69d32ccb-0cf9-4bef-bbdd-42bba084e46d	2570	1	2026-10-22 09:55:39.715+07
1dd2bed4-2141-4f28-a11f-04aca4460735	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	69d32ccb-0cf9-4bef-bbdd-42bba084e46d	2570	1	2026-10-22 09:55:39.715+07
33b2a903-c91a-4cf4-a87d-95e8708a3e26	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	69d32ccb-0cf9-4bef-bbdd-42bba084e46d	2570	1	2026-10-22 09:55:39.715+07
681d8ebc-8d17-456f-8a74-6f24d967e00f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	69d32ccb-0cf9-4bef-bbdd-42bba084e46d	2570	1	2026-10-22 09:55:39.715+07
8f65abf8-71f3-4bfc-9ecd-cf5bd9021abe	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	69d32ccb-0cf9-4bef-bbdd-42bba084e46d	2570	1	2026-10-22 09:55:39.715+07
61582068-9929-474c-82aa-23018d8543d5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	dc715c60-bc4d-4434-84d9-772a5a5b6f82	2570	1	2026-10-22 09:55:39.742+07
709a2043-2eb5-4d3e-a39c-bcb720498c88	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	dc715c60-bc4d-4434-84d9-772a5a5b6f82	2570	1	2026-10-22 09:55:39.742+07
835c78e1-d2a7-461a-9c12-ea871bab80ab	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	dc715c60-bc4d-4434-84d9-772a5a5b6f82	2570	1	2026-10-22 09:55:39.742+07
96582003-d3a4-4099-aacc-f806ec123692	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	dc715c60-bc4d-4434-84d9-772a5a5b6f82	2570	1	2026-10-22 09:55:39.742+07
c1485ab9-fec9-4d1f-b9e8-0b006671fba6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	dc715c60-bc4d-4434-84d9-772a5a5b6f82	2570	1	2026-10-22 09:55:39.742+07
219d58b3-e404-4bfb-aae3-82004c988c62	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	7d77415e-3066-4346-b914-282974216e2a	2570	1	2026-10-22 09:55:39.765+07
b33c0803-59df-4707-98de-e161ab9b9b2f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	7d77415e-3066-4346-b914-282974216e2a	2570	1	2026-10-22 09:55:39.765+07
4ea3ba53-0615-4db1-a995-0f66bbb06b5f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	7d77415e-3066-4346-b914-282974216e2a	2570	1	2026-10-22 09:55:39.765+07
169aa468-e1e0-4af0-bc28-a99efd541256	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	7d77415e-3066-4346-b914-282974216e2a	2570	1	2026-10-22 09:55:39.765+07
c77ebefb-38ca-4bdf-b113-85c25b232bfe	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	7d77415e-3066-4346-b914-282974216e2a	2570	1	2026-10-22 09:55:39.765+07
9df260c8-6bc8-4436-8b20-ffb69a0061c0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	a90fc127-d3f6-4440-ba3d-34c316e8354b	2570	1	2026-10-22 09:55:39.791+07
a6a46980-b0a4-4ff1-852a-0e2819f2f3f2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	a90fc127-d3f6-4440-ba3d-34c316e8354b	2570	1	2026-10-22 09:55:39.791+07
fcf41f27-397a-4c64-aa0f-18f8dac8deb7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	a90fc127-d3f6-4440-ba3d-34c316e8354b	2570	1	2026-10-22 09:55:39.791+07
edf139de-0a10-4b49-b60d-da3c9ad9d4fa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	a90fc127-d3f6-4440-ba3d-34c316e8354b	2570	1	2026-10-22 09:55:39.791+07
a69a8028-322d-430c-9faf-4740131a3a38	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	a90fc127-d3f6-4440-ba3d-34c316e8354b	2570	1	2026-10-22 09:55:39.791+07
b0c9b3c0-e66f-4620-852f-f64681db0a79	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	69064b16-8808-4806-b2a6-c284c893cde1	2570	1	2026-10-22 09:55:39.811+07
29df1a53-39fa-48f6-8659-ce9a308cea3b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	69064b16-8808-4806-b2a6-c284c893cde1	2570	1	2026-10-22 09:55:39.811+07
c55c9da4-df48-4fe2-8c31-8d6d162f3113	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	69064b16-8808-4806-b2a6-c284c893cde1	2570	1	2026-10-22 09:55:39.811+07
9fc02e5d-0733-4c76-ad71-192a11df25e1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	69064b16-8808-4806-b2a6-c284c893cde1	2570	1	2026-10-22 09:55:39.811+07
392d2c66-bdf9-4485-bbcf-5b771d544f6b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	69064b16-8808-4806-b2a6-c284c893cde1	2570	1	2026-10-22 09:55:39.811+07
1d8e4f26-f406-426f-a4c3-5f8151ab44b7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	0e1b4f70-7a8e-4c6f-9889-e0e271b9486b	2570	1	2026-10-22 09:55:39.83+07
9a83abcc-c8b2-41c5-aee8-0767b6a8bb66	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	0e1b4f70-7a8e-4c6f-9889-e0e271b9486b	2570	1	2026-10-22 09:55:39.83+07
49957ba8-428e-4ce8-a8ad-90e0befcddb8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	0e1b4f70-7a8e-4c6f-9889-e0e271b9486b	2570	1	2026-10-22 09:55:39.83+07
55731163-9af4-4e33-a96c-38ab1ae7d4f9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	0e1b4f70-7a8e-4c6f-9889-e0e271b9486b	2570	1	2026-10-22 09:55:39.83+07
41f3ddcd-1319-4228-856f-dbd1c1cbd481	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	0e1b4f70-7a8e-4c6f-9889-e0e271b9486b	2570	1	2026-10-22 09:55:39.83+07
d19a50b9-7789-49cf-af3c-9049baaa9e06	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	ead541e9-9a9a-4c7b-b341-65d54e9e4b22	2570	1	2026-10-22 09:55:39.851+07
4005789d-c9ba-462e-86e8-66b5f59c4163	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	cb3fef95-e768-4db0-99da-dbd78974ebd0	ead541e9-9a9a-4c7b-b341-65d54e9e4b22	2570	1	2026-10-22 09:55:39.851+07
b92372c3-b323-4eaf-bac9-5f6874ad0c82	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	ead541e9-9a9a-4c7b-b341-65d54e9e4b22	2570	1	2026-10-22 09:55:39.851+07
bd23f53e-b5f3-4feb-a208-d7eb64da6adf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	64b57e5b-62af-46a1-a58d-d1368e09d0bf	ead541e9-9a9a-4c7b-b341-65d54e9e4b22	2570	1	2026-10-22 09:55:39.851+07
d5632b37-9095-4401-abc5-a5764349c177	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	7f262b09-224f-4a68-b421-aecfce9b5713	ead541e9-9a9a-4c7b-b341-65d54e9e4b22	2570	1	2026-10-22 09:55:39.851+07
d855e63a-dcde-416d-a9c6-07db87802d43	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	8670e651-6591-46af-b3d5-561bbb8ed192	2569	2	2026-10-22 09:58:19.79+07
a7d339bc-8baa-43c4-8be7-44cb776cbc19	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	8670e651-6591-46af-b3d5-561bbb8ed192	2569	2	2026-10-22 09:58:19.79+07
1326df32-4a1f-40ef-833f-2aaa08f85cc2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	8670e651-6591-46af-b3d5-561bbb8ed192	2569	2	2026-10-22 09:58:19.79+07
d73f60e8-bcea-4860-85b5-2d06e074fe91	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	a07addd2-d41e-4011-85a6-3f9595c45f82	2569	2	2026-10-22 09:58:19.825+07
2c081e7b-8562-4782-ae0c-7a79c49c18af	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	a07addd2-d41e-4011-85a6-3f9595c45f82	2569	2	2026-10-22 09:58:19.825+07
d36367de-02d1-4e78-b1fa-e7e84caeca31	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	a07addd2-d41e-4011-85a6-3f9595c45f82	2569	2	2026-10-22 09:58:19.825+07
ea49e5f9-c130-4592-b092-ba3cb73dfea7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	fe025f37-5e92-4b5a-8e87-8cd144ed668e	2569	2	2026-10-22 09:58:19.849+07
6ab8c020-a749-461c-84ac-75727032e46f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	fe025f37-5e92-4b5a-8e87-8cd144ed668e	2569	2	2026-10-22 09:58:19.849+07
868a50b1-43ba-4425-be53-f548608a6904	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	fe025f37-5e92-4b5a-8e87-8cd144ed668e	2569	2	2026-10-22 09:58:19.849+07
149248ca-5acd-446b-a256-fcc54e17fc9e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	f0e0be7b-7ff7-44a9-b96c-d0d29ceea1ee	2569	2	2026-10-22 09:58:19.87+07
f9d1b52c-de2e-4283-9399-26a03ce077cd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	f0e0be7b-7ff7-44a9-b96c-d0d29ceea1ee	2569	2	2026-10-22 09:58:19.87+07
83ba518d-3959-4832-bb05-80a421699477	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	f0e0be7b-7ff7-44a9-b96c-d0d29ceea1ee	2569	2	2026-10-22 09:58:19.87+07
900b01b3-01c0-423e-81a2-c2d386eae9f9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	2f78259f-7aa7-491c-ab7a-6029cfe64d50	2569	2	2026-10-22 09:58:19.893+07
ae63701f-6f82-41cb-94b7-e63fa4a65a88	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	2f78259f-7aa7-491c-ab7a-6029cfe64d50	2569	2	2026-10-22 09:58:19.893+07
b10ca905-8e29-4a78-92bb-f7a56f86c587	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	2f78259f-7aa7-491c-ab7a-6029cfe64d50	2569	2	2026-10-22 09:58:19.893+07
f04c7886-07b2-4608-9a15-8e37a37f7669	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	fc6fd553-22c5-4a8e-94e3-8e46162d2087	2569	2	2026-10-22 09:58:19.915+07
f344b566-fe86-43aa-9b6e-609d4e26e21b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	fc6fd553-22c5-4a8e-94e3-8e46162d2087	2569	2	2026-10-22 09:58:19.915+07
844f5f72-ba39-45b1-9dc6-51b12652d820	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	fc6fd553-22c5-4a8e-94e3-8e46162d2087	2569	2	2026-10-22 09:58:19.915+07
164c52e3-4f8f-4a9d-904a-7e26a99e7d2e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	56f5a20c-7bda-477e-8152-873e31947e33	2569	2	2026-10-22 09:58:19.936+07
37e832ee-6246-4cc7-a358-9d0c60adaadd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	56f5a20c-7bda-477e-8152-873e31947e33	2569	2	2026-10-22 09:58:19.936+07
54fbc111-ca79-4f8b-a525-6daabb3438e5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	56f5a20c-7bda-477e-8152-873e31947e33	2569	2	2026-10-22 09:58:19.936+07
d04c4504-6671-4910-9d4d-9b68533285f3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	7c4cf103-3d7e-422a-b208-1dbf6c2b66a8	2569	2	2026-10-22 09:58:19.956+07
509d2354-a6b4-4fb6-b438-7fe7e194fe08	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	7c4cf103-3d7e-422a-b208-1dbf6c2b66a8	2569	2	2026-10-22 09:58:19.956+07
40ff93a0-2b35-4fc0-b3c5-2c1b6a8e26a0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	7c4cf103-3d7e-422a-b208-1dbf6c2b66a8	2569	2	2026-10-22 09:58:19.956+07
8116608d-5ea3-43a2-aa7a-15236e75e766	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	23e43a67-7598-400c-a74e-e5799b4fc484	2569	2	2026-10-22 09:58:19.978+07
9a28ce6b-dcec-4982-b6c9-6a36a5de8f78	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	23e43a67-7598-400c-a74e-e5799b4fc484	2569	2	2026-10-22 09:58:19.978+07
b1c00aac-fa10-4ee8-9013-d2275576467f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	23e43a67-7598-400c-a74e-e5799b4fc484	2569	2	2026-10-22 09:58:19.978+07
9ff0d8e7-f5fc-494c-a95b-0bcfab591a14	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	ee75c3d8-8048-41ce-a49a-aa225baa0205	2569	2	2026-10-22 09:58:20+07
b1b668e8-5553-4dcb-83f2-c47d88bb39e3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	ee75c3d8-8048-41ce-a49a-aa225baa0205	2569	2	2026-10-22 09:58:20+07
daf4f438-d02b-4f98-b8c2-a4c33d9bccd9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	ee75c3d8-8048-41ce-a49a-aa225baa0205	2569	2	2026-10-22 09:58:20+07
0414fd68-c32c-4ab0-bc21-a744fc7b4c4e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	a25d12f9-9876-43ab-84d9-1938c10068bf	2569	2	2026-10-22 09:58:20.02+07
3aa48547-e44c-459b-a23a-909bdd816cb5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	a25d12f9-9876-43ab-84d9-1938c10068bf	2569	2	2026-10-22 09:58:20.02+07
5d86578d-d4eb-4b4c-9c30-a63f7c05dde4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	a25d12f9-9876-43ab-84d9-1938c10068bf	2569	2	2026-10-22 09:58:20.02+07
fb57b6d1-a21c-4ac7-9a8f-e953f9e0d6db	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	68caa170-e4f2-43a8-8048-e9eff53a627c	2569	2	2026-10-22 09:58:20.04+07
4f2dcbdb-0e00-4e55-8019-fe3d98f94d42	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	68caa170-e4f2-43a8-8048-e9eff53a627c	2569	2	2026-10-22 09:58:20.04+07
a249627f-32f4-4fb0-95d7-f40523db2a8a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	68caa170-e4f2-43a8-8048-e9eff53a627c	2569	2	2026-10-22 09:58:20.04+07
e790fe90-3f1d-4613-8c8d-51d35788b6e6	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	16c95ed1-e49b-4ce9-9674-9a3c8bf6c53e	2569	2	2026-10-22 09:58:20.066+07
46f89fb3-cb53-43b5-beb6-69d32db62e0e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	16c95ed1-e49b-4ce9-9674-9a3c8bf6c53e	2569	2	2026-10-22 09:58:20.066+07
cd30033e-25d4-4987-b647-4df5017bd277	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	16c95ed1-e49b-4ce9-9674-9a3c8bf6c53e	2569	2	2026-10-22 09:58:20.066+07
a5d925dd-429d-433b-ac51-c8bfc75b1f61	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	52dad28b-5aea-4ae5-8a57-0643855dfdee	2569	2	2026-10-22 09:58:20.087+07
bf2a55ab-f716-4c84-a3a9-555f65da1eab	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	52dad28b-5aea-4ae5-8a57-0643855dfdee	2569	2	2026-10-22 09:58:20.087+07
868f81e7-3e73-48f3-926b-0e7a9b7813a4	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	52dad28b-5aea-4ae5-8a57-0643855dfdee	2569	2	2026-10-22 09:58:20.087+07
7c8bcb71-6d25-4013-9535-b49d20263b1e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	99d6da80-3a97-409f-9264-6998723cad16	c2d93de8-86ed-4be7-bd0e-39fb4a22947b	2569	2	2026-10-22 09:58:20.119+07
338c53f9-e5ad-4cb6-acc7-43d19fadbe0f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	140a5cb5-79a3-4415-a167-f451ed101dba	c2d93de8-86ed-4be7-bd0e-39fb4a22947b	2569	2	2026-10-22 09:58:20.119+07
28f20b4a-5504-4de8-b107-91b89a256129	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	31bfedfd-7d37-4966-8aef-15094675c01b	c2d93de8-86ed-4be7-bd0e-39fb4a22947b	2569	2	2026-10-22 09:58:20.119+07
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

COPY public.courses (id, curriculum_id, course_code, name, credits, semester, course_type, created_at, updated_at, instructor_id, instructor_name, subject_group, academic_year, target_grade) FROM stdin;
6c7a7261-4c54-461a-8d41-ac03411f930e	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ท21101	ภาษาไทย 1 (ม.1)	1.5	1	CORE	2026-10-09 12:01:57.95+07	2026-10-22 08:28:48.148+07	58ab30a1-c765-45b6-a698-4e292045c4f1	สุชาดา เกตุแก้ว	กลุ่มสาระการเรียนรู้ภาษาไทย	2569	ม.1
5672f0fc-cb74-41d3-a754-f0f86372992b	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ว21101	วิทยาศาสตร์และเทคโนโลยี 1 (ม.1)	1.5	1	CORE	2026-10-09 12:01:57.975+07	2026-10-22 08:28:48.152+07	519c20c9-149b-4d39-91d9-7bf9e0bc7c99	อรรถพล จอมมงคล	กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี	2569	ม.1
0bd1534e-9935-46b6-807e-2e374316481f	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ป	ปวัติศาสตร์ 1 (ม.1)	0.5	1	CORE	2026-10-22 07:49:00.21+07	2026-10-22 08:28:48.163+07	b326fa6d-769e-4dc8-993b-dc5e9e129ccd	พชรพล พื้นบาท	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2569	ม.1
88b6c1be-1d9a-4fd7-a0cc-a4c2b65bb6e5	c8692e29-4a5a-436d-b663-97d1b48dfbe1	อ	ภาษาอังกฤษพื้นฐาน 1 (ม.1)	1.5	1	CORE	2026-10-22 07:39:54.98+07	2026-10-22 08:28:48.167+07	18b86442-9b75-4e23-8386-80849a4ac336	พระมหาศุภชัย สุญาโณ	กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ	2569	ม.1
df6b6d81-270e-4462-ac95-e22e5f9aae5a	c8692e29-4a5a-436d-b663-97d1b48dfbe1	En	ภาษาอังกฤษเพื่อการสื่อสาร 1 (ม.1)	0.5	1	CORE	2026-10-22 07:50:11.523+07	2026-10-22 08:28:48.17+07	1ceb76ed-d440-4daa-b2d3-d936425f0599	พระมหาศักดิ์สิทธิ์ สุเมธโส	กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ	2569	ม.1
e30d1b81-7093-4398-a6b1-a6a0415fbdf6	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ท	ภาษาไทยเพื่อการสื่อสาร 1 (ม.1)	0.5	1	CORE	2026-10-22 07:51:11.371+07	2026-10-22 08:28:48.173+07	17438cf8-fc24-4812-b48c-701cd553b18c	พระครูวินัยธรเอกชัย ฐิตปญฺโญ	กลุ่มสาระการเรียนรู้ภาษาไทย	2569	ม.1
c768a99a-51a0-48a9-8528-33bd9b8bde67	c8692e29-4a5a-436d-b663-97d1b48dfbe1	พ	พระพุทธศาสนา 1 (ม.1)	1.5	1	CORE	2026-10-22 07:43:32.43+07	2026-10-22 08:28:48.178+07	e8d6991f-a7f2-44a4-b51e-d6d8f0f53eb8	พระอุดรคณารักษ์ บุญทัน ธีรงฺกุโร	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2569	ม.1
a7ffe522-9a71-4f7c-80e2-0c6d5f3de06f	0ee15b94-e1d3-4ec3-9023-37a03f04f353	ป	ปรัชญาเบื้องต้น 1 (ม.4)	0.5	1	CORE	2026-10-22 07:44:38.321+07	2026-10-22 09:00:43.175+07	18b86442-9b75-4e23-8386-80849a4ac336	พระมหาศุภชัย สุญาโณ	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2569	ม.4
923e0b6d-de11-4e13-8cd8-229bdc994336	0ee15b94-e1d3-4ec3-9023-37a03f04f353	ท21401	ภาษาไทย 1 (ม.4)	1	1	CORE	2026-10-22 07:13:03.222+07	2026-10-22 08:28:48.095+07	58ab30a1-c765-45b6-a698-4e292045c4f1	สุชาดา เกตุแก้ว	กลุ่มสาระการเรียนรู้ภาษาไทย	2569	ม.4
3a6990cb-71f3-4905-aadc-327a579d833f	c8692e29-4a5a-436d-b663-97d1b48dfbe1	บ	ภาษาบาลี 1 (ม.1)	1	1	CORE	2026-10-22 07:40:35.641+07	2026-10-22 08:28:48.104+07	20fe5998-224b-4283-8029-a7d4d5bd269e	พระมหาบุญยงค์ ปุญฺญญาโณ	กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ	2569	ม.1
b49fe103-3358-4df1-b278-7402ea155ad0	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ส	สังคมศึกษาฯ1 (ม.1)	1	1	CORE	2026-10-22 07:17:11.322+07	2026-10-22 08:28:48.111+07	e8d6991f-a7f2-44a4-b51e-d6d8f0f53eb8	พระอุดรคณารักษ์ บุญทัน ธีรงฺกุโร	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2569	ม.1
b01c5cd7-dba8-410b-a481-497c17060016	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ส1	สุขศึกษาและพลศึกษา 1 (ม.1)	1	1	CORE	2026-10-22 07:36:08.416+07	2026-10-22 08:28:48.115+07	d53d512c-4a08-4203-a2ed-138da859a128	ธงชัย พลเยี่ยม	กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา	2569	ม.1
c3b8b194-f1d3-438a-9a0d-b6a3830100af	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ศน	ศาสนปฏิบัติ 1 (ม.1)	1	1	CORE	2026-10-22 07:42:02.07+07	2026-10-22 08:28:48.12+07	7d80db3d-6637-44b1-bd3d-b6bb71ab2d05	พระมหาธีรภัทร ญาณธีโร	พุทธศาสน์ศึกษาและภาษาบาลี	2569	ม.1
8b71007e-0e5a-4d7d-b692-9704c80286fc	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ศ	ศิลปะ 1 (ม.1)	1	1	CORE	2026-10-22 07:37:35.406+07	2026-10-22 08:28:48.129+07	e50611ec-9d8e-4a46-8e5d-2cac630c3636	พระมหาศิริศักดิ์ สาสนเมธี	กลุ่มสาระการเรียนรู้ศิลปะ	2569	ม.1
0817447d-f9ea-498a-a528-c4c385f7b60e	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ง	การงานอาชีพ 1 (ม.1)	1	1	CORE	2026-10-22 07:38:53.798+07	2026-10-22 08:28:48.134+07	87eddfc8-4a17-4e31-8010-5732060a19da	พระมหาสม ติสฺสเทโว	กลุ่มสาระการเรียนรู้การงานอาชีพ	2569	ม.1
f24e501d-04de-4f98-b5e4-5b3e617e31da	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ค21101	คณิตศาสตร์ 1 (ม.1)	1.5	1	CORE	2026-10-09 12:01:57.966+07	2026-10-22 08:28:48.144+07	09252ab6-6a4c-4f82-966c-7b3632767b2b	ศราวุฒิ จำวัน วิวัฒนเมธากุล	กลุ่มสาระการเรียนรู้คณิตศาสตร์	2569	ม.1
2acdb632-f0fe-4487-a3db-c082c2d993a5	c8692e29-4a5a-436d-b663-97d1b48dfbe1	หน	หน้าที่พลเมือง 1 (ม.1)	0.5	1	CORE	2026-10-22 07:42:48.803+07	2026-10-22 08:28:48.159+07	a082a558-d8eb-430c-9d23-51491a1f3f6f	สมพร หลังแก้ว	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2569	ม.1
99d04e16-1f07-4c3b-992a-cf6027225d67	0ee15b94-e1d3-4ec3-9023-37a03f04f353	ค21401	คณิตศาสตร์1 (ม.4)	1	1	CORE	2026-10-16 15:27:25.056+07	2026-10-22 08:28:48.185+07	09252ab6-6a4c-4f82-966c-7b3632767b2b	ศราวุฒิ จำวัน วิวัฒนเมธากุล	กลุ่มสาระการเรียนรู้คณิตศาสตร์	2569	ม.4
d7f233b6-d9fe-42e8-bcdc-d345e123751c	0ee15b94-e1d3-4ec3-9023-37a03f04f353	ว21401	วิทยาศาสตร์และเทคโนโลยี 1 (ม.4)	1	1	CORE	2026-10-22 07:15:02.976+07	2026-10-22 08:28:48.189+07	\N	นิโรจน์ วงศ์เมืองแก่น,อรรพล จอมมงคล	กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี	2569	ม.4
97b50dad-b641-4dea-b574-1c1b5bf5741c	0ee15b94-e1d3-4ec3-9023-37a03f04f353	ส1	สุขศึกษาและพลศึกษา1 (ม.4)	0.5	1	CORE	2026-10-22 07:36:58.157+07	2026-10-22 09:00:21.054+07	b326fa6d-769e-4dc8-993b-dc5e9e129ccd	พชรพล พื้นบาท	กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา	2569	ม.4
85930f90-8554-4794-89aa-b09ee09372b8	0ee15b94-e1d3-4ec3-9023-37a03f04f353	ส	สังคมศึกษาฯ 1 (ม.4)	1.5	1	CORE	2026-10-22 09:02:20.487+07	2026-10-22 09:02:52.067+07	7d80db3d-6637-44b1-bd3d-b6bb71ab2d05	พระมหาธีรภัทร ญาณธีโร	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2569	ม.4
9053460e-009e-4db1-a322-5e9e909b258a	0ee15b94-e1d3-4ec3-9023-37a03f04f353	ศ	ศิลปะ 1 (ม.4)	0.5	1	CORE	2026-10-22 09:03:34.68+07	2026-10-22 09:03:34.68+07	e50611ec-9d8e-4a46-8e5d-2cac630c3636	พระมหาศิริศักดิ์ สาสนเมธี	กลุ่มสาระการเรียนรู้ภาษาไทย	2569	ม.4
e1c65ac4-9bfe-4780-a07a-38ebf3db35e5	0ee15b94-e1d3-4ec3-9023-37a03f04f353	ง	การงานอาชีพ 1 (ม.4)	0.5	1	CORE	2026-10-22 09:04:21.72+07	2026-10-22 09:04:21.72+07	87eddfc8-4a17-4e31-8010-5732060a19da	พระมหาสม ติสฺสเทโว	กลุ่มสาระการเรียนรู้การงานอาชีพ	2569	ม.4
704c0570-566f-4146-8b59-d3dcba9e67c2	0ee15b94-e1d3-4ec3-9023-37a03f04f353	E	ภาษาอังกฤษพื้นฐาน 1 (ม.4)	1	1	CORE	2026-10-22 09:05:30.357+07	2026-10-22 09:05:30.357+07	18b86442-9b75-4e23-8386-80849a4ac336	พระมหาศุภชัย สุญาโณ	กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ	2569	ม.4
ca10d8c1-eb30-4e4b-8537-75444b6d5b68	0ee15b94-e1d3-4ec3-9023-37a03f04f353	บ	ภาษาบาลี 1 (ม.4)	1	1	CORE	2026-10-22 09:06:05.446+07	2026-10-22 09:06:20.442+07	20fe5998-224b-4283-8029-a7d4d5bd269e	พระมหาบุญยงค์ ปุญฺญญาโณ	พุทธศาสน์ศึกษาและภาษาบาลี	2569	ม.4
cc9f0168-ff7b-4b17-9269-3c62217cc41f	0ee15b94-e1d3-4ec3-9023-37a03f04f353	ศน	ศาสนปฏิบัติ 1 (ม.4)	1	1	CORE	2026-10-22 09:07:10.69+07	2026-10-22 09:07:10.69+07	7d80db3d-6637-44b1-bd3d-b6bb71ab2d05	พระมหาธีรภัทร ญาณธีโร	พุทธศาสน์ศึกษาและภาษาบาลี	2569	ม.4
280acafe-eb5d-4d02-8cd9-67a5ef970ccc	0ee15b94-e1d3-4ec3-9023-37a03f04f353	หน	หน้าที่พลเมือง 1 (ม.4)	0.5	1	CORE	2026-10-22 09:08:22.288+07	2026-10-22 09:08:41.795+07	b326fa6d-769e-4dc8-993b-dc5e9e129ccd	พชรพล พื้นบาท	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2569	ม.4
b0f3debf-eb29-4c00-bf90-133f670704b5	0ee15b94-e1d3-4ec3-9023-37a03f04f353	พ	พระพุทธศาสนา 1 (ม.4)	1	1	CORE	2026-10-22 09:09:16.263+07	2026-10-22 09:09:16.263+07	e8d6991f-a7f2-44a4-b51e-d6d8f0f53eb8	พระอุดรคณารักษ์ บุญทัน ธีรงฺกุโร	พุทธศาสน์ศึกษาและภาษาบาลี	2569	ม.4
9da7b135-667a-481b-981f-5acf55a84a6f	0ee15b94-e1d3-4ec3-9023-37a03f04f353	ค	คอมพิวเตอร์ขั้นสูง 1 (ม.4)	1	1	CORE	2026-10-22 09:10:15.329+07	2026-10-22 09:11:21.777+07	78a48338-1f0b-43b2-b7a5-c6b2d1f54257	นิโรจน์ วงศ์เมืองแก่น	กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี	2569	ม.4
598c4894-8f92-4ea6-b4c6-7f5386c5d0c3	0ee15b94-e1d3-4ec3-9023-37a03f04f353	อ	ภาษาอังกฤษเพื่อการสื่อสาร 1 (ม.4)	1	1	CORE	2026-10-22 09:12:25.608+07	2026-10-22 09:12:25.608+07	1ceb76ed-d440-4daa-b2d3-d936425f0599	พระมหาศักดิ์สิทธิ์ สุเมธโส	กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ	2569	ม.4
49ec97d5-dd51-4a60-812e-d6b8b2cc637d	c8692e29-4a5a-436d-b663-97d1b48dfbe1	En	ภาษาอังกฤษเพื่อการสื่อสาร 1 (ม.1)	0.5	1	CORE	2026-10-22 09:55:39.48+07	2026-10-22 09:55:39.48+07	1ceb76ed-d440-4daa-b2d3-d936425f0599	พระมหาศักดิ์สิทธิ์ สุเมธโส	กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ	2570	ม.1
8bd1bc11-8708-4581-b0a1-936c4d1dd7c2	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ค21101	คณิตศาสตร์ 1 (ม.1)	1.5	1	CORE	2026-10-22 09:55:39.526+07	2026-10-22 09:55:39.526+07	09252ab6-6a4c-4f82-966c-7b3632767b2b	ศราวุฒิ จำวัน วิวัฒนเมธากุล	กลุ่มสาระการเรียนรู้คณิตศาสตร์	2570	ม.1
b89e8c2b-de0f-4d8e-83cc-95088e654675	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ง	การงานอาชีพ 1 (ม.1)	1	1	CORE	2026-10-22 09:55:39.554+07	2026-10-22 09:55:39.554+07	87eddfc8-4a17-4e31-8010-5732060a19da	พระมหาสม ติสฺสเทโว	กลุ่มสาระการเรียนรู้การงานอาชีพ	2570	ม.1
2bcdb223-2efb-434a-8b9a-ce3ed3f46f2b	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ท	ภาษาไทยเพื่อการสื่อสาร 1 (ม.1)	0.5	1	CORE	2026-10-22 09:55:39.579+07	2026-10-22 09:55:39.579+07	17438cf8-fc24-4812-b48c-701cd553b18c	พระครูวินัยธรเอกชัย ฐิตปญฺโญ	กลุ่มสาระการเรียนรู้ภาษาไทย	2570	ม.1
10dd56c3-ca82-4fe0-8329-99ef7b11feca	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ท21101	ภาษาไทย 1 (ม.1)	1.5	1	CORE	2026-10-22 09:55:39.603+07	2026-10-22 09:55:39.603+07	58ab30a1-c765-45b6-a698-4e292045c4f1	สุชาดา เกตุแก้ว	กลุ่มสาระการเรียนรู้ภาษาไทย	2570	ม.1
82ef3f3f-6b72-40f7-9941-768dff0ece74	c8692e29-4a5a-436d-b663-97d1b48dfbe1	บ	ภาษาบาลี 1 (ม.1)	1	1	CORE	2026-10-22 09:55:39.628+07	2026-10-22 09:55:39.628+07	20fe5998-224b-4283-8029-a7d4d5bd269e	พระมหาบุญยงค์ ปุญฺญญาโณ	กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ	2570	ม.1
c78a0115-968d-4f00-b769-d425cf755b10	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ป	ปวัติศาสตร์ 1 (ม.1)	0.5	1	CORE	2026-10-22 09:55:39.651+07	2026-10-22 09:55:39.651+07	b326fa6d-769e-4dc8-993b-dc5e9e129ccd	พชรพล พื้นบาท	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2570	ม.1
9d04a493-7604-4b96-9f5c-4702d63b4f2d	c8692e29-4a5a-436d-b663-97d1b48dfbe1	พ	พระพุทธศาสนา 1 (ม.1)	1.5	1	CORE	2026-10-22 09:55:39.674+07	2026-10-22 09:55:39.674+07	e8d6991f-a7f2-44a4-b51e-d6d8f0f53eb8	พระอุดรคณารักษ์ บุญทัน ธีรงฺกุโร	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2570	ม.1
69d32ccb-0cf9-4bef-bbdd-42bba084e46d	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ว21101	วิทยาศาสตร์และเทคโนโลยี 1 (ม.1)	1.5	1	CORE	2026-10-22 09:55:39.698+07	2026-10-22 09:55:39.698+07	519c20c9-149b-4d39-91d9-7bf9e0bc7c99	อรรถพล จอมมงคล	กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี	2570	ม.1
dc715c60-bc4d-4434-84d9-772a5a5b6f82	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ศ	ศิลปะ 1 (ม.1)	1	1	CORE	2026-10-22 09:55:39.726+07	2026-10-22 09:55:39.726+07	e50611ec-9d8e-4a46-8e5d-2cac630c3636	พระมหาศิริศักดิ์ สาสนเมธี	กลุ่มสาระการเรียนรู้ศิลปะ	2570	ม.1
7d77415e-3066-4346-b914-282974216e2a	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ศน	ศาสนปฏิบัติ 1 (ม.1)	1	1	CORE	2026-10-22 09:55:39.753+07	2026-10-22 09:55:39.753+07	7d80db3d-6637-44b1-bd3d-b6bb71ab2d05	พระมหาธีรภัทร ญาณธีโร	พุทธศาสน์ศึกษาและภาษาบาลี	2570	ม.1
a90fc127-d3f6-4440-ba3d-34c316e8354b	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ส	สังคมศึกษาฯ1 (ม.1)	1	1	CORE	2026-10-22 09:55:39.778+07	2026-10-22 09:55:39.778+07	e8d6991f-a7f2-44a4-b51e-d6d8f0f53eb8	พระอุดรคณารักษ์ บุญทัน ธีรงฺกุโร	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2570	ม.1
69064b16-8808-4806-b2a6-c284c893cde1	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ส1	สุขศึกษาและพลศึกษา 1 (ม.1)	1	1	CORE	2026-10-22 09:55:39.798+07	2026-10-22 09:55:39.798+07	d53d512c-4a08-4203-a2ed-138da859a128	ธงชัย พลเยี่ยม	กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา	2570	ม.1
0e1b4f70-7a8e-4c6f-9889-e0e271b9486b	c8692e29-4a5a-436d-b663-97d1b48dfbe1	หน	หน้าที่พลเมือง 1 (ม.1)	0.5	1	CORE	2026-10-22 09:55:39.82+07	2026-10-22 09:55:39.82+07	a082a558-d8eb-430c-9d23-51491a1f3f6f	สมพร หลังแก้ว	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2570	ม.1
ead541e9-9a9a-4c7b-b341-65d54e9e4b22	c8692e29-4a5a-436d-b663-97d1b48dfbe1	อ	ภาษาอังกฤษพื้นฐาน 1 (ม.1)	1.5	1	CORE	2026-10-22 09:55:39.839+07	2026-10-22 09:55:39.839+07	18b86442-9b75-4e23-8386-80849a4ac336	พระมหาศุภชัย สุญาโณ	กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ	2570	ม.1
8670e651-6591-46af-b3d5-561bbb8ed192	c8692e29-4a5a-436d-b663-97d1b48dfbe1	En	ภาษาอังกฤษเพื่อการสื่อสาร 2 (ม.1)	0.5	2	CORE	2026-10-22 09:58:19.749+07	2026-10-22 09:58:19.749+07	1ceb76ed-d440-4daa-b2d3-d936425f0599	พระมหาศักดิ์สิทธิ์ สุเมธโส	กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ	2569	ม.1
a07addd2-d41e-4011-85a6-3f9595c45f82	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ค21101	คณิตศาสตร์ 2 (ม.1)	1.5	2	CORE	2026-10-22 09:58:19.812+07	2026-10-22 09:58:19.812+07	09252ab6-6a4c-4f82-966c-7b3632767b2b	ศราวุฒิ จำวัน วิวัฒนเมธากุล	กลุ่มสาระการเรียนรู้คณิตศาสตร์	2569	ม.1
fe025f37-5e92-4b5a-8e87-8cd144ed668e	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ง	การงานอาชีพ 2 (ม.1)	1	2	CORE	2026-10-22 09:58:19.835+07	2026-10-22 09:58:19.835+07	87eddfc8-4a17-4e31-8010-5732060a19da	พระมหาสม ติสฺสเทโว	กลุ่มสาระการเรียนรู้การงานอาชีพ	2569	ม.1
f0e0be7b-7ff7-44a9-b96c-d0d29ceea1ee	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ท	ภาษาไทยเพื่อการสื่อสาร 2(ม.1)	0.5	2	CORE	2026-10-22 09:58:19.857+07	2026-10-22 09:58:19.857+07	17438cf8-fc24-4812-b48c-701cd553b18c	พระครูวินัยธรเอกชัย ฐิตปญฺโญ	กลุ่มสาระการเรียนรู้ภาษาไทย	2569	ม.1
2f78259f-7aa7-491c-ab7a-6029cfe64d50	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ท21101	ภาษาไทย 2 (ม.1)	1.5	2	CORE	2026-10-22 09:58:19.881+07	2026-10-22 09:58:19.881+07	58ab30a1-c765-45b6-a698-4e292045c4f1	สุชาดา เกตุแก้ว	กลุ่มสาระการเรียนรู้ภาษาไทย	2569	ม.1
fc6fd553-22c5-4a8e-94e3-8e46162d2087	c8692e29-4a5a-436d-b663-97d1b48dfbe1	บ	ภาษาบาลี 2 (ม.1)	1	2	CORE	2026-10-22 09:58:19.902+07	2026-10-22 09:58:19.902+07	20fe5998-224b-4283-8029-a7d4d5bd269e	พระมหาบุญยงค์ ปุญฺญญาโณ	กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ	2569	ม.1
56f5a20c-7bda-477e-8152-873e31947e33	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ป	ปวัติศาสตร์ 2 (ม.1)	0.5	2	CORE	2026-10-22 09:58:19.923+07	2026-10-22 09:58:19.923+07	b326fa6d-769e-4dc8-993b-dc5e9e129ccd	พชรพล พื้นบาท	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2569	ม.1
7c4cf103-3d7e-422a-b208-1dbf6c2b66a8	c8692e29-4a5a-436d-b663-97d1b48dfbe1	พ	พระพุทธศาสนา 2 (ม.1)	1.5	2	CORE	2026-10-22 09:58:19.945+07	2026-10-22 09:58:19.945+07	e8d6991f-a7f2-44a4-b51e-d6d8f0f53eb8	พระอุดรคณารักษ์ บุญทัน ธีรงฺกุโร	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2569	ม.1
23e43a67-7598-400c-a74e-e5799b4fc484	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ว21101	วิทยาศาสตร์และเทคโนโลยี 2 (ม.1)	1.5	2	CORE	2026-10-22 09:58:19.966+07	2026-10-22 09:58:19.966+07	519c20c9-149b-4d39-91d9-7bf9e0bc7c99	อรรถพล จอมมงคล	กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี	2569	ม.1
ee75c3d8-8048-41ce-a49a-aa225baa0205	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ศ	ศิลปะ 2 (ม.1)	1	2	CORE	2026-10-22 09:58:19.987+07	2026-10-22 09:58:19.987+07	e50611ec-9d8e-4a46-8e5d-2cac630c3636	พระมหาศิริศักดิ์ สาสนเมธี	กลุ่มสาระการเรียนรู้ศิลปะ	2569	ม.1
a25d12f9-9876-43ab-84d9-1938c10068bf	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ศน	ศาสนปฏิบัติ 2 (ม.1)	1	2	CORE	2026-10-22 09:58:20.007+07	2026-10-22 09:58:20.007+07	7d80db3d-6637-44b1-bd3d-b6bb71ab2d05	พระมหาธีรภัทร ญาณธีโร	พุทธศาสน์ศึกษาและภาษาบาลี	2569	ม.1
68caa170-e4f2-43a8-8048-e9eff53a627c	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ส	สังคมศึกษาฯ2 (ม.1)	1	2	CORE	2026-10-22 09:58:20.03+07	2026-10-22 09:58:20.03+07	e8d6991f-a7f2-44a4-b51e-d6d8f0f53eb8	พระอุดรคณารักษ์ บุญทัน ธีรงฺกุโร	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2569	ม.1
16c95ed1-e49b-4ce9-9674-9a3c8bf6c53e	c8692e29-4a5a-436d-b663-97d1b48dfbe1	ส1	สุขศึกษาและพลศึกษา 2 (ม.1)	1	2	CORE	2026-10-22 09:58:20.051+07	2026-10-22 09:58:20.051+07	d53d512c-4a08-4203-a2ed-138da859a128	ธงชัย พลเยี่ยม	กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา	2569	ม.1
52dad28b-5aea-4ae5-8a57-0643855dfdee	c8692e29-4a5a-436d-b663-97d1b48dfbe1	หน	หน้าที่พลเมือง 2 (ม.1)	0.5	2	CORE	2026-10-22 09:58:20.073+07	2026-10-22 09:58:20.073+07	a082a558-d8eb-430c-9d23-51491a1f3f6f	สมพร หลังแก้ว	กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม	2569	ม.1
c2d93de8-86ed-4be7-bd0e-39fb4a22947b	c8692e29-4a5a-436d-b663-97d1b48dfbe1	อ	ภาษาอังกฤษพื้นฐาน 1 (ม.1)	1.5	2	CORE	2026-10-22 09:58:20.098+07	2026-10-22 09:58:20.098+07	18b86442-9b75-4e23-8386-80849a4ac336	พระมหาศุภชัย สุญาโณ	กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ	2569	ม.1
\.


--
-- Data for Name: curriculums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.curriculums (id, tenant_id, code, name, degree_level, total_credits, description, is_active, created_at, updated_at, image_url, department_id, career_prospects, curriculum_year, degree_name_en, degree_name_th, duration_years, elective_credits, ge_credits, major_credits, name_en, objectives, pdf_url, philosophy) FROM stdin;
0ee15b94-e1d3-4ec3-9023-37a03f04f353	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	CURR-SHS-LANG-2568	หลักสูตรมัธยมศึกษาตอนปลาย แผนการเรียนภาษา-สังคมศึกษาและพุทธศาสน์ศึกษา (ม.4 - ม.6)	มัธยมศึกษาตอนปลาย (ม.4 - ม.6)	82	หลักสูตร 3 ปี รายวิชาพื้นฐาน 41 หน่วยกิต และวิชาเพิ่มเติมภาษา-สังคมศึกษา 35 หน่วยกิต รวม 82 หน่วยกิต ตอบโจทย์การศึกษาต่อด้านมนุษยศาสตร์และสังคมศาสตร์	t	2026-10-09 10:18:26.939+07	2026-10-22 06:53:55.791+07	/uploads/44383856-64a8-428e-9970-f7503ac00ebd.jpg	\N	เข้าศึกษาต่อระดับอุดมศึกษาในคณะนิติศาสตร์ รัฐศาสตร์ อักษรศาสตร์/มนุษยศาสตร์ ศิลปศาสตร์ ครุศาสตร์ นิเทศศาสตร์ บริหารธุรกิจ และพุทธศาสตร์	2551 (ปรับปรุง 2560)	Certificate of Senior Secondary Education	ประกาศนียบัตรมัธยมศึกษาตอนปลาย (ม.6)	3	6	41	35	Senior Secondary Curriculum: Languages, Social & Buddhist Studies (Grade 10-12)	1. พัฒนาทักษะการสื่อสารภาษาอังกฤษและภาษาที่สองในระดับสากล 2. เข้าใจประวัติศาสตร์ วัฒนธรรม และหลักธรรมทางพระพุทธศาสนาอย่างลึกซึ้ง 3. เสริมสร้างความเป็นผู้นำทางสังคม มนุษยศาสตร์ และการสื่อสารร่วมสมัย	https://drive.google.com/file/d/1Xl1TatpbXwduozCxibCINfEihF9F_aEb/view?usp=sharing	มุ่งสร้างเยาวชนผู้เชี่ยวชาญด้านภาษา การสื่อสารสากล ความเข้าใจพหุวัฒนธรรม และหลักพุทธธรรมเพื่อเป็นเสาหลักทางจริยธรรมของสังคม
c8692e29-4a5a-436d-b663-97d1b48dfbe1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	CURR-JHS-2568	หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน ระดับมัธยมศึกษาตอนต้น (ม.1 - ม.3)	มัธยมศึกษาตอนต้น (ม.1 - ม.3)	88	หลักสูตร 3 ปี (ม.1-ม.3) เวลาเรียนพื้นฐาน 66 หน่วยกิต (2,640 ชม.) รายวิชาเพิ่มเติม 16 หน่วยกิต และกิจกรรมพัฒนาผู้เรียน 360 ชม. รวมเวลาเรียนตลอด 3 ปี ไม่น้อยกว่า 3,600 ชั่วโมง	t	2026-10-09 10:18:26.913+07	2026-10-22 06:56:27.573+07	/uploads/afb4588a-c93c-4d29-9706-d56c28e74dcf.jpg	\N	ศึกษาต่อระดับมัธยมศึกษาตอนปลายสายสามัญ (แผนการเรียนวิทยาศาสตร์-คณิตศาสตร์, ศิลป์-คำนวณ, ศิลป์-ภาษา), สายอาชีวศึกษา (ปวช.), หรือสถาบันการศึกษาเฉพาะทาง	2551 (ปรับปรุง 2560)	Certificate of Lower Secondary Education	ประกาศนียบัตรมัธยมศึกษาตอนต้น (ม.3)	3	6	66	16	Basic Education Core Curriculum for Lower Secondary Education (Grade 7-9)	1. เพื่อปลูกฝังคุณธรรม จริยธรรม และค่านิยมที่พึงประสงค์ตามหลักพุทธศาสนา 2. เพื่อพัฒนาทักษะวิชาการพื้นฐาน 8 กลุ่มสาระการเรียนรู้ให้เต็มตามศักยภาพ 3. เพื่อเสริมสร้างสมรรถนะการคิดวิเคราะห์ วิทยาการคำนวณ และการสื่อสารสากล 4. เพื่อเตรียมความพร้อมในการศึกษาต่อระดับมัธยมศึกษาตอนปลาย	https://drive.google.com/file/d/1Xl1TatpbXwduozCxibCINfEihF9F_aEb/view?usp=sharing	มุ่งพัฒนาผู้เรียนให้มีความรู้คู่คุณธรรม มีปัญญารู้คิด มีความสามารถในการสื่อสาร การแก้ปัญหา ทักษะชีวิต และการใช้เทคโนโลยี บนพื้นฐานอัตลักษณ์พุทธธรรมของโรงเรียนสาธิต มจร
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

COPY public.employees (id, tenant_id, user_id, department_id, employee_code, first_name, last_name, "position", contact_info, is_active, created_at, updated_at, image_url, display_order) FROM stdin;
3d87f61a-934e-4898-9ef7-1c052e2ec5ce	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-003	พระวิมลรัตนาภรณ์	บุญมา พลญาโณ	ผู้อำนวยการโรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-09-12 06:29:06.022+07	2026-10-15 11:10:53.933+07	/uploads/877a46d8-aaa4-494d-aa49-d72847eb0bd5.png	1
58ab30a1-c765-45b6-a698-4e292045c4f1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-035034301	สุชาดา	เกตุแก้ว	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:07:15.041+07	2026-10-15 12:07:15.041+07	\N	17
e8d6991f-a7f2-44a4-b51e-d6d8f0f53eb8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-002	พระอุดรคณารักษ์	บุญทัน ธีรงฺกุโร	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-09-12 06:29:06.018+07	2026-10-15 11:14:16.37+07	https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.6435-9/131771057_4082384838509400_8926963014548763443_n.jpg?stp=dst-jpg_tt6&cstp=mx1240x1754&ctp=s1240x1754&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGACKg5ow4lVdWNVfmxJGHEDMXJC6p2bG4MxckLqnZsbhnTlqxRJyC6YtMPpKhbOGk&_nc_ohc=3Zed2OzBugsQ7kNvwEWeUYX&_nc_oc=AdqwyVEAUVPCT3FCS5V8IZY--8WDYSlgYCdrAuuA_gI02OsSzyCPc-Y0XdBsejwxSUgbcOQRo2zSjyaVWnkFwl3b&_nc_zt=23&_nc_ht=scontent.fbkk2-7.fna&_nc_gid=DU4cszNHHSG1NgnWcMyfcw&_nc_ss=7b2a8&oh=00_AQOAgEIvvqkurb8J131ymAJvgyHxFXupvqEjbutPW-TSRQ&oe=6AF815B8	3
87eddfc8-4a17-4e31-8010-5732060a19da	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-141850689	พระมหาสม	ติสฺสเทโว	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 11:02:21.852+07	2026-10-15 11:02:21.852+07	\N	4
eefbac9c-0f0d-4f00-8883-c4ba4d5bfac0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-001	พระมหามนตรี	ญาณมนฺโต	รองผู้อำนวยการโรงเรียนสาธิต มจร ฝ่ายวิชาการ	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-09-12 06:29:06.012+07	2026-10-15 12:00:10.458+07	/uploads/0ddb6a5d-66c0-43da-b72e-cc017b3c57cf.png	2
20fe5998-224b-4283-8029-a7d4d5bd269e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-760112634	พระมหาบุญยงค์	ปุญฺญญาโณ	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:02:40.114+07	2026-10-15 12:02:40.114+07	\N	7
1ceb76ed-d440-4daa-b2d3-d936425f0599	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-783764677	พระมหาศักดิ์สิทธิ์	สุเมธโส	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:03:03.767+07	2026-10-15 12:03:03.767+07	\N	8
8dbd5887-1b9d-4166-9d8b-131b399e7eae	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-090122708	วิภาพร	ทุนาบาล	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:08:10.125+07	2026-10-15 12:08:10.125+07	\N	18
2f315543-d4de-4fca-8a99-57a2d0572213	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-147359160	พระมหาวันเฉลิม	สุวทิตฺตเมธี	นักจัดการงานทั่วไป	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:09:07.362+07	2026-10-15 12:09:07.362+07	\N	19
f92ff365-d8ab-444a-98a0-b3ebe156b450	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-176081502	พระมหาสหัสวรรษ	กลฺยาณญาโณ	นักจัดการงานทั่วไป	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:09:36.084+07	2026-10-15 12:09:36.084+07	\N	20
d53d512c-4a08-4203-a2ed-138da859a128	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-924571632	ธงชัย	พลเยี่ยม	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:05:24.573+07	2026-10-15 12:05:24.573+07	\N	13
b326fa6d-769e-4dc8-993b-dc5e9e129ccd	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-979305315	พชรพล	พื้นบาท	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:06:19.307+07	2026-10-15 12:06:19.307+07	\N	15
a082a558-d8eb-430c-9d23-51491a1f3f6f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-001145402	สมพร	หลังแก้ว	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:06:41.148+07	2026-10-15 12:06:41.148+07	/uploads/df64ad0a-f043-4681-a3f4-3987570441c3.png	16
18b86442-9b75-4e23-8386-80849a4ac336	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-726892184	พระมหาศุภชัย	สุญาโณ	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:02:06.896+07	2026-10-15 12:06:51.881+07	/uploads/d4f9abd1-a799-4f20-8b9c-227858f447c7.jpg	6
170e44b4-ef04-405b-9900-fd7b875a44b1	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-210721776	พระอภิสิทธิ์	สิทฺธาคโม	นักวิชาการศึกษา	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:10:10.722+07	2026-10-15 12:10:21.091+07	\N	21
968310ac-f96d-4e5c-9a26-af2b5d7e68ca	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-383895775	ชลิตา	อ่อนคำหล้า	นักวิชาการศึกษา	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:13:03.9+07	2026-10-15 12:13:03.9+07	\N	22
2b9bdd3a-45cf-4ef9-b836-8f4f2b960f4d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-458383776	บุษดากร	คุ้มสมบัติ	นักวิชาการการเงินและบัญชี	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:14:18.386+07	2026-10-15 12:14:18.386+07	\N	24
f53c1b08-7d32-4590-8ff7-db878bfb2755	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-503191715	ชุมพล	จันทนะสุคนธ์	นายช่างเทคนิค	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:15:03.193+07	2026-10-15 12:15:03.193+07	\N	26
78a48338-1f0b-43b2-b7a5-c6b2d1f54257	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-904087362	นิโรจน์	วงศ์เมืองแก่น	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:05:04.089+07	2026-10-15 12:17:52.695+07	/uploads/cd36b017-d26b-423f-80da-8a05fd854d8a.jpg	12
519c20c9-149b-4d39-91d9-7bf9e0bc7c99	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-883611604	อรรถพล	จอมมงคล	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:04:43.615+07	2026-10-15 12:18:03.154+07	/uploads/da4414d1-238d-4bb1-a13c-e60ec36f2398.jpg	11
e50611ec-9d8e-4a46-8e5d-2cac630c3636	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-829893331	พระมหาศิริศักดิ์	สาสนเมธี	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:03:49.902+07	2026-10-15 12:19:14.806+07	/uploads/58b9f29d-87ca-4eba-826e-a3b16f0384f8.jpg	10
7d80db3d-6637-44b1-bd3d-b6bb71ab2d05	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-804406948	พระมหาธีรภัทร	ญาณธีโร	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:03:24.408+07	2026-10-15 12:19:31.657+07	/uploads/3ecfbf34-8c20-4a2f-baa5-a9f411f40332.jpg	9
92834b83-fb38-4dda-b832-2850e5655cad	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-478598539	โสภณ	ปี่แก้ว	บรรณารักษ์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:14:38.601+07	2026-10-15 12:20:40.463+07	/uploads/8f8804f1-e3dd-4366-a206-9d6839505b11.jpg	25
2276fd79-a482-4d4c-9465-c3c0bec5cf01	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-527209297	อานุภพ	ชายกวด	นักการภารโรง	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:15:27.214+07	2026-10-15 12:20:51.483+07	/uploads/1fe07108-859b-4fe1-9a8c-074a4d50c756.jpg	27
17438cf8-fc24-4812-b48c-701cd553b18c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-686255679	พระครูวินัยธรเอกชัย	ฐิตปญฺโญ	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:01:26.258+07	2026-10-15 12:16:22.486+07	https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/597605167_1405953671541331_7484989085504107507_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1080&ctp=s1080x1080&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEkL5mrC2xMkGLP0hpxcCLtVQXrgQrM7ztVBeuBCszvO-ODFZ6k5XrenVmY0jTNhWY&_nc_ohc=iHDlyM6Pql8Q7kNvwGJ2W8p&_nc_oc=AdrORF358JrG5Bu54NVGslkv3rjgKjJWsCM0GUwU4MlFu_t1vtlPPvlZk5vSa_PFspjVY3cGjOu54ybXO9B-UeIF&_nc_zt=23&_nc_ht=scontent.fbkk2-7.fna&_nc_gid=49JVhxWY9xF1En77F1d4aQ&_nc_ss=7b2a8&oh=00_AQONke3mxbhff9PWWD_BFyQHbXSz-c_1NiZlAcprCbfL4Q&oe=6AD66AD1	5
09252ab6-6a4c-4f82-966c-7b3632767b2b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-951066568	ศราวุฒิ	จำวัน วิวัฒนเมธากุล	อาจารย์	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:05:51.08+07	2026-10-15 12:18:17.781+07	/uploads/c34ccc5e-41a7-4dd1-b239-cdf3e568672a.jpg	14
59420b7f-e205-4cfc-9085-c53839eeebc5	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	\N	\N	EMP-440795409	ชาคริช	พิชิตถกล	นักวิชาการการเงินและบัญชี	{"email": null, "phone": null, "lineId": null, "address": null}	t	2026-10-15 12:14:00.8+07	2026-10-15 12:21:03.615+07	/uploads/6e97899a-a2af-401c-ba09-d8a50cb3db49.jpg	23
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
email:admin@satit.mcu.ac.th	2	\N	2026-10-15 09:41:04.281+07
email:admin@satitmcu.ac.th	3	\N	2026-10-15 13:33:49.519+07
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, code, module, action, description) FROM stdin;
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
d5fa103e-3716-4fd2-bcb7-f980f057ca00	facility.read	facility	read	Read facility
7c390088-1c40-45eb-a603-1b54518b4835	facility.manage	facility	manage	Manage facility
5decd2d3-06c3-4136-a2bf-4d7e2f08135b	DOCUMENT_READ	document	read	Read document and registration
c5372d79-e861-4ae5-bef4-6578a518f99a	DOCUMENT_MANAGE	document	manage	Manage document and registration
baa30877-1709-4439-84ce-9c64e590d954	PP6_READ	document	read_pp6	Read PP6 student evaluation report
80614086-1f16-4e18-bc91-e35ee867691e	users:read	users	read	Read users
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
af1306cf-a62e-46c9-8557-929d8aa7748f	5decd2d3-06c3-4136-a2bf-4d7e2f08135b
af1306cf-a62e-46c9-8557-929d8aa7748f	c5372d79-e861-4ae5-bef4-6578a518f99a
af1306cf-a62e-46c9-8557-929d8aa7748f	baa30877-1709-4439-84ce-9c64e590d954
af1306cf-a62e-46c9-8557-929d8aa7748f	80614086-1f16-4e18-bc91-e35ee867691e
773c1a95-deb3-4c08-8183-8752579121ee	5decd2d3-06c3-4136-a2bf-4d7e2f08135b
773c1a95-deb3-4c08-8183-8752579121ee	baa30877-1709-4439-84ce-9c64e590d954
773c1a95-deb3-4c08-8183-8752579121ee	80614086-1f16-4e18-bc91-e35ee867691e
ae8a4f75-9f72-4e71-9a7b-6d01080b7b26	5decd2d3-06c3-4136-a2bf-4d7e2f08135b
ae8a4f75-9f72-4e71-9a7b-6d01080b7b26	baa30877-1709-4439-84ce-9c64e590d954
5b7b77d3-23c7-4132-8134-fe06d86c69f9	5decd2d3-06c3-4136-a2bf-4d7e2f08135b
5b7b77d3-23c7-4132-8134-fe06d86c69f9	baa30877-1709-4439-84ce-9c64e590d954
ebd7540d-85a6-4c76-8669-70548b089a9a	5decd2d3-06c3-4136-a2bf-4d7e2f08135b
ebd7540d-85a6-4c76-8669-70548b089a9a	c5372d79-e861-4ae5-bef4-6578a518f99a
ebd7540d-85a6-4c76-8669-70548b089a9a	baa30877-1709-4439-84ce-9c64e590d954
f38b3726-0965-45a9-be72-ad64d45f3d84	5decd2d3-06c3-4136-a2bf-4d7e2f08135b
f38b3726-0965-45a9-be72-ad64d45f3d84	baa30877-1709-4439-84ce-9c64e590d954
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, tenant_id, code, name_th, name_en, description, is_system, created_at, updated_at) FROM stdin;
1239ae04-41ee-458e-a62c-c9f58d054471	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	SUPER_ADMIN	ผู้ดูแลสูงสุด	Super admin	\N	t	2026-09-11 03:08:14.878+07	2026-09-12 06:29:05.429+07
7908a9e6-f125-4f91-b268-d778d6e0228e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ADMIN	ผู้ดูแลระบบ	Administrator	\N	f	2026-09-11 03:08:14.882+07	2026-09-12 06:29:05.433+07
af1306cf-a62e-46c9-8557-929d8aa7748f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	ACADEMIC_OFFICER	เจ้าหน้าที่วิชาการศึกษา	Academic Officer	\N	f	2026-10-16 09:41:03.472+07	2026-10-16 09:41:03.472+07
773c1a95-deb3-4c08-8183-8752579121ee	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	TEACHER	อาจารย์ / ครูผู้สอน	Teacher	\N	f	2026-10-16 09:41:03.554+07	2026-10-16 09:41:03.554+07
ae8a4f75-9f72-4e71-9a7b-6d01080b7b26	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	PARENT	ผู้ปกครอง	Parent	\N	f	2026-10-16 09:41:03.573+07	2026-10-16 09:41:03.573+07
5b7b77d3-23c7-4132-8134-fe06d86c69f9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STUDENT	นักเรียน	Student	\N	f	2026-10-16 09:41:03.587+07	2026-10-16 09:41:03.587+07
ebd7540d-85a6-4c76-8669-70548b089a9a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STAFF	เจ้าหน้าที่	Staff	\N	f	2026-09-11 03:08:14.911+07	2026-10-16 09:41:03.602+07
f38b3726-0965-45a9-be72-ad64d45f3d84	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	VIEWER	ผู้ดู	Viewer	\N	f	2026-09-11 03:08:14.919+07	2026-10-16 09:41:03.626+07
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
99d6da80-3a97-409f-9264-6998723cad16	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-101	ด.ช.	กิตติศักดิ์	รักเรียน	ม.1/1	1	ชาย	ACTIVE	2026-10-09 12:01:58.002+07	2026-10-09 15:54:00.568+07	2569	2
140a5cb5-79a3-4415-a167-f451ed101dba	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-102	ด.ญ.	จินตนา	ปัญญาดี	ม.1/1	2	หญิง	ACTIVE	2026-10-09 12:01:58.013+07	2026-10-09 15:54:00.582+07	2569	2
31bfedfd-7d37-4966-8aef-15094675c01b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-103	ด.ช.	ณัฐดนัย	สุขเกษม	ม.1/1	3	ชาย	ACTIVE	2026-10-09 12:01:58.017+07	2026-10-09 15:54:00.594+07	2569	2
83f55947-d781-48ad-88ed-b85c74b82396	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๙	สามเณร	ทศพร	ทองมี	ม.1/1	7	ชาย	ACTIVE	2026-10-13 11:09:53.356+07	2026-10-13 11:09:53.356+07	2569	1
14c9c5ab-22a8-4ee5-86a0-4e6fdf90b978	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671011	สามเณร	ภัคพงษ์	พันธุมา	ม.2	6	ชาย	ACTIVE	2026-10-13 11:19:42.613+07	2026-10-13 11:19:42.613+07	2569	1
0dd6e650-e0df-4aef-9607-7634123f6c07	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671012	สามเณร	ภคนันท์	ปาฮาดไชย	ม.2	7	ชาย	ACTIVE	2026-10-13 11:19:42.629+07	2026-10-13 11:19:42.629+07	2569	1
334f8e7f-8b0f-464d-b56c-a5653b8f8fd9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671013	สามเณร	ธนพล	บุญยรัตพันธุ์	ม.2	8	ชาย	ACTIVE	2026-10-13 11:19:42.657+07	2026-10-13 11:19:42.657+07	2569	1
3699340a-1b7a-4de8-934b-dc1962c80943	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671007	สามเณร	เจตริน	สิ้นโศรก	ม.4	2	ชาย	ACTIVE	2026-10-13 11:19:42.585+07	2026-10-13 11:41:50.831+07	2569	2
c55ae954-20bf-4638-b457-64ef0c5aeddb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671008	สามเณร	ณัฐพล	โสมงาม	ม.4	3	ชาย	ACTIVE	2026-10-13 11:19:42.592+07	2026-10-13 11:42:48.04+07	2569	2
091ec7fa-05d9-488c-95e0-52f5abce9d89	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671009	สามเณร	เดชาพล	เทพกูล	ม.4	4	ชาย	ACTIVE	2026-10-13 11:19:42.599+07	2026-10-13 11:42:55.186+07	2569	2
543b6a96-8fb4-4430-aef2-06f6e964a614	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14671010	สามเณร	สิวะกร	เทพกูล	ม.4	5	ชาย	ACTIVE	2026-10-13 11:19:42.607+07	2026-10-13 11:43:02.531+07	2569	2
f108d67c-7ac4-45aa-93db-c0946eb89872	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๓	สามเณร	กันตพงศ์	เรดี	ม.1	1	ชาย	ACTIVE	2026-10-13 11:09:52.792+07	2026-10-22 08:11:21.698+07	2569	1
af8b5452-6c59-4cd3-b18c-911deb15959d	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๕	สามเณร	เข็มทิศ	พุทธสอน	ม.1	3	ชาย	ACTIVE	2026-10-13 11:09:53.327+07	2026-10-22 08:11:32.11+07	2569	1
6d0bc46c-4709-4c29-bc93-32dc2b59d299	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๖	สามเณร	ณัฐวุฒิ	พูลสม	ม.1	4	ชาย	ACTIVE	2026-10-13 11:09:53.335+07	2026-10-22 08:11:37.956+07	2569	1
ffc5cf5a-5086-4341-81e5-11634bdde855	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๗	สามเณร	ณัฐสิษฐ์	จันดาชัยอนันต์	ม.1	5	ชาย	ACTIVE	2026-10-13 11:09:53.341+07	2026-10-22 08:11:43.036+07	2569	1
91d6e928-54df-48b2-b507-9d9b59a6409a	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๘	สามเณร	ตะวัน	ฮุยเสนา	ม.1	6	ชาย	ACTIVE	2026-10-13 11:09:53.349+07	2026-10-22 08:11:48.063+07	2569	1
10de0ea3-b6e1-46c7-847f-8a5fa99effb8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๐	สามเณร	ธนเดช	อภัยพิม	ม.1	8	ชาย	ACTIVE	2026-10-13 11:09:53.363+07	2026-10-22 08:11:53.354+07	2569	1
64ea5ccc-516f-4bcf-be56-c53b00311e0b	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๑	สามเณร	นะโม	นาสีดา	ม.1	9	ชาย	ACTIVE	2026-10-13 11:09:53.37+07	2026-10-22 08:11:57.947+07	2569	1
b6d32800-52d3-4fc4-a452-169086fe3ea8	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๒	สามเณร	ปิยะ	จันล้วน	ม.1	10	ชาย	ACTIVE	2026-10-13 11:09:53.376+07	2026-10-22 08:12:02.797+07	2569	1
a93bc421-5ea8-47e4-b886-bc8e5266fde3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๓	สามเณร	พรพิพัฒน์	พลมาตย์	ม.1	11	ชาย	ACTIVE	2026-10-13 11:09:53.383+07	2026-10-22 08:12:07.625+07	2569	1
20842ac0-2da2-46a3-9412-f81b587ab762	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๔	สามเณร	พีรพล	พงศ์ร่วมมิตร	ม.1	12	ชาย	ACTIVE	2026-10-13 11:09:53.389+07	2026-10-22 08:12:13.732+07	2569	1
28aa324e-d56b-42d7-9cc6-7d83eac27515	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๕	สามเณร	พุทธภูมิ	บุญจอม	ม.1	13	ชาย	ACTIVE	2026-10-13 11:09:53.397+07	2026-10-22 08:12:18.495+07	2569	1
2c95c5f1-b295-4b2a-8a9c-4ad4cd9a54e2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๖	สามเณร	ภูผา	รุ่งเรือง	ม.1	14	ชาย	ACTIVE	2026-10-13 11:09:53.404+07	2026-10-22 08:12:23.239+07	2569	1
3a9f315e-82e1-4f05-a124-2eb8748a28b9	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๗	สามเณร	วศิน	อินเลี้ยง	ม.1	15	ชาย	ACTIVE	2026-10-13 11:09:53.41+07	2026-10-22 08:12:28.907+07	2569	1
a9013d28-7b6d-475b-8b6c-ce3ecef400f3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๘	สามเณร	ศักดา	วาลา	ม.1	16	ชาย	ACTIVE	2026-10-13 11:09:53.417+07	2026-10-22 08:12:33.957+07	2569	1
e5d6702e-7195-4e52-91ff-44d9ce67b414	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๑๙	สามเณร	ศิวกร	วงษาภา	ม.1	17	ชาย	ACTIVE	2026-10-13 11:09:53.423+07	2026-10-22 08:12:38.966+07	2569	1
82642422-0fb8-47ff-b6aa-82b60a2536bb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14681006	สามเณร	ชโยดม	ม่วงพูลสวาสดิ์	ม.1	18	ชาย	ACTIVE	2026-10-13 11:09:53.431+07	2026-10-22 08:12:43.944+07	2569	1
83c427cd-538d-4483-9f26-0409efda2abb	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	14681008	สามเณร	ณัฐศาสตร์	เก่งการรบ	ม.1	19	ชาย	ACTIVE	2026-10-13 11:09:53.437+07	2026-10-22 08:12:49.609+07	2569	1
b7bb2c30-effa-4016-9ba3-3519d3eae188	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-403	น.ส.	วริศรา	เกียรติบำรุง	ม.5	3	หญิง	ACTIVE	2026-10-09 12:01:58.039+07	2026-10-22 09:49:45.25+07	2570	1
963fa502-7291-4568-bbd0-4c2a272173a0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-404	น.ส.	ศศิธร	ประเสริฐสิน	ม.5	4	หญิง	ACTIVE	2026-10-09 12:01:58.043+07	2026-10-22 09:49:45.269+07	2570	1
07d2cd46-ca01-40d7-b321-9702f46c34fa	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-405	นาย	อัครพล	ธนสารสมบูรณ์	ม.5	5	ชาย	ACTIVE	2026-10-09 12:01:58.048+07	2026-10-22 09:49:45.275+07	2570	1
dbdb2e53-070f-4612-b197-d075c58cc138	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-401	นาย	ธนพล	รุ่งเรือง	ม.4	1	ชาย	ACTIVE	2026-10-09 12:01:58.03+07	2026-10-22 09:51:55.008+07	2569	1
565387f8-adba-45ab-9f39-19515556215c	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU69-402	น.ส.	พรทิพย์	วิไลวรรณ	ม.4	2	หญิง	ACTIVE	2026-10-09 12:01:58.035+07	2026-10-22 09:51:55.035+07	2569	1
7f262b09-224f-4a68-b421-aecfce9b5713	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-401	นาย	ธนพล	รุ่งเรือง	ม.1	4	ชาย	ACTIVE	2026-10-09 15:58:48.595+07	2026-10-22 10:22:17.566+07	2570	1
64b57e5b-62af-46a1-a58d-d1368e09d0bf	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-402	น.ส.	พรทิพย์	วิไลวรรณ	ม.1	5	หญิง	ACTIVE	2026-10-09 15:58:48.604+07	2026-10-22 10:22:17.584+07	2570	1
0698f9a5-3f3b-4033-9d3f-6b5da0d932ba	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-101	ด.ช.	กิตติศักดิ์	รักเรียน	ม.1	1	ชาย	ACTIVE	2026-10-09 15:58:48.339+07	2026-10-22 10:22:17.499+07	2570	1
cb3fef95-e768-4db0-99da-dbd78974ebd0	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-102	ด.ญ.	จินตนา	ปัญญาดี	ม.1	2	หญิง	ACTIVE	2026-10-09 15:58:48.573+07	2026-10-22 10:22:17.533+07	2570	1
65dc1df0-7c5f-4fcc-97c4-87f7ec7bd63f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-103	ด.ช.	ณัฐดนัย	สุขเกษม	ม.1	3	ชาย	ACTIVE	2026-10-09 15:58:48.585+07	2026-10-22 10:22:17.549+07	2570	1
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
c2dcc219-51d1-4b20-b10d-0808db77d4a3	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	๑๔๖๙๑๐๐๔	สามเณร	กิตติศักดิ์	ใยพัน	ม.1	2	ชาย	ACTIVE	2026-10-13 11:09:53.32+07	2026-10-22 08:11:27.238+07	2569	1
ac9c6791-140e-4904-9f50-38cf919b98f7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-101	ด.ช.	กิตติศักดิ์	รักเรียน	ม.1	1	ชาย	ACTIVE	2026-10-22 10:52:48.864+07	2026-10-22 10:52:48.864+07	2570	2
5a0ca215-8dcc-4c92-93aa-5a289582b3c2	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-102	ด.ญ.	จินตนา	ปัญญาดี	ม.1	2	หญิง	ACTIVE	2026-10-22 10:52:48.892+07	2026-10-22 10:52:48.892+07	2570	2
27f9a81e-48aa-4998-85f9-d6beba872d7e	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-103	ด.ช.	ณัฐดนัย	สุขเกษม	ม.1	3	ชาย	ACTIVE	2026-10-22 10:52:48.902+07	2026-10-22 10:52:48.902+07	2570	2
a58bc196-ee6b-4850-a27f-b19b2660885f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-401	นาย	ธนพล	รุ่งเรือง	ม.1	4	ชาย	ACTIVE	2026-10-22 10:52:48.911+07	2026-10-22 10:52:48.911+07	2570	2
ca08189f-f78c-4e13-b33c-9edd1bf07451	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	STU70-402	น.ส.	พรทิพย์	วิไลวรรณ	ม.1	5	หญิง	ACTIVE	2026-10-22 10:52:48.919+07	2026-10-22 10:52:48.919+07	2570	2
\.


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tenants (id, code, name_th, name_en, logo_url, settings, is_active, created_at, updated_at) FROM stdin;
f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	DEMO	โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย	SATIT MCU	/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg	{"smtp": {"from": "SATIT MCU System <hero2027@gmail.com>", "host": "smtp.gmail.com", "pass": "bqnm vzzy mpjg cmss", "port": 465, "user": "hero2027@gmail.com", "secure": true}, "palette": "pink", "executives": [{"id": "exec-1", "email": "chamnan@mcu.ac.th", "phone": "035-248-8747 ต่อ 8747", "prefix": "พระศรีวัชรศาสตรบัณฑิต,ดร.", "message": null, "imageUrl": "https://www.mcu.ac.th/directory_uploads/administrator/manage_image/20250220230508_A38A6A6B-5583-4F53-9C07-0161AF9B166F.jpeg", "isActive": true, "lastName": "มหาชาโน", "position": "รองอธิการบดีฝ่ายประชาสัมพันธ์ และเผยแผ่ ประธานคณะกรรมการโรงเรียนสาธิต", "createdAt": "2026-10-14T07:16:17.650Z", "firstName": "พระมหาชำนาญ", "updatedAt": "2026-10-15T08:03:58.359Z", "department": "คณะกรรมการโรงเรียนสาธิต", "academicRank": "ดร., ป.ธ.๙", "displayOrder": 1}, {"id": "exec-2", "email": null, "phone": "035-248-000 ต่อ 8094", "prefix": "พระศรีวัชรสารบัณฑิต, ผศ.ดร.", "message": null, "imageUrl": "https://www.mcu.ac.th/directory_uploads/administrator/manage_image/20240808094321_76EA38E9-5A6B-41A8-8208-B82D251D74AA.jpg", "isActive": true, "lastName": "ปณฺฑิตเมธี / จรินทร์", "position": "คณบดีคณะครุศาสตร์ รองประธานกรรมการ", "createdAt": "2026-10-14T07:16:17.650Z", "firstName": "พระมหาบัณฑิต", "updatedAt": "2026-10-15T08:07:09.518Z", "department": "คณะกรรมการโรงเรียนสาธิต", "academicRank": "ป.ธ.๙,ค.ด. (พุทธบริหารการศึกษา)", "displayOrder": 2}, {"id": "867e1682-c4fc-4e19-a371-f0c7927402df", "email": null, "phone": null, "prefix": "พระวิมลรัตนาภรณ์", "message": null, "imageUrl": "/uploads/9abee330-ff2a-498b-bb2e-e6a09db53388.png", "isActive": true, "lastName": "พลญาโณ", "position": "ผู้อำนวยการโรงเรียนสาธิตฯ กรรมการและเลขานุการ", "createdAt": "2026-10-15T09:12:38.396Z", "firstName": "บุญมา", "updatedAt": "2026-10-15T09:14:59.180Z", "department": "คณะกรรมการโรงเรียนสาธิต", "academicRank": "ป.ธ.๓ พธ.บ. พธ.ม.", "displayOrder": 3}, {"id": "1f449a49-0ca5-460e-a1c5-fd8faff89c4a", "email": null, "phone": null, "prefix": "พระมหา", "message": null, "imageUrl": "/uploads/2b7ed228-3eff-4079-a544-a2a0502b65ea.png", "isActive": true, "lastName": "ญาณมนโต/สามารถไทย", "position": "รองผู้อำนวยการโรงเรียนสาธิตฯ ฝ่ายวิชาการ", "createdAt": "2026-10-15T09:26:59.938Z", "firstName": "มนตรี", "updatedAt": "2026-10-15T09:28:36.401Z", "department": "", "academicRank": "น.ธ. เอก, ป.ธ. ๖ พธ.บ., กศ.ม.", "displayOrder": 4}, {"id": "f9edbd7e-e851-48ff-9f25-60b276989b7e", "email": null, "phone": null, "prefix": "", "message": null, "imageUrl": null, "isActive": true, "lastName": "-", "position": "รองผู้อำนวยการโรงเรียนสาธิตฯ ฝ่ายบริหาร กรรมการและเลขานุการ", "createdAt": "2026-10-15T09:14:25.171Z", "firstName": "-", "updatedAt": "2026-10-15T09:29:09.895Z", "department": "คณะกรรมการโรงเรียนสาธิต", "academicRank": "", "displayOrder": 5}, {"id": "exec-3", "email": "pchoos@aru.ac.th", "phone": "035-276555 ต่อ 1001", "prefix": "รศ.ดร.", "message": null, "imageUrl": "/uploads/71146633-db45-4301-b3cd-d6ad8c721ee7.jpg", "isActive": true, "lastName": "ประดับเพ็ชร์", "position": "อธิการบดีมหาวิทยาลัยราชภัฏพระนครศรีอยุธยา กรรมการผู้ทรงคุณวุฒิ", "createdAt": "2026-10-14T07:16:17.650Z", "firstName": "ชูสิทธิ์", "updatedAt": "2026-10-15T09:29:15.249Z", "department": "คณะกรรมการโรงเรียนสาธิต", "academicRank": "Doctor of Philosophy(Ph.D.) Ph.D.in the field of Media and Network Technologies Hokkaido University, Japan", "displayOrder": 6}, {"id": "exec-4", "email": null, "phone": null, "prefix": "อาจารย์", "message": null, "imageUrl": "https://academic.snru.ac.th/wp-content/uploads/2015/08/ChatGPT-Image-Jul-2-2026-09_51_25-AM.png", "isActive": true, "lastName": "เลื่องลือ", "position": "รองผู้อำนวยการ สำนักส่งเสริมวิชาการและงานทะเบียน มหาวิทยาลัยราชภัฏสกลนคร กรรมการผู้ทรงคุณวุฒิ", "createdAt": "2026-10-14T07:16:17.650Z", "firstName": "คมกริบ", "updatedAt": "2026-10-15T09:29:21.288Z", "department": "คณะกรรมการโรงเรียนสาธิต", "academicRank": "นิติศาสตรมหาบัณฑิต (น.ม.)", "displayOrder": 7}, {"id": "a9a8f554-7a8d-42af-8600-affeb968afbe", "email": "sretthapong.sr@gmail.com", "phone": null, "prefix": "ดร.", "message": null, "imageUrl": "/uploads/c17d45c0-e761-40e9-885b-c7894b6deee8.jpg", "isActive": true, "lastName": "ศรีเลิศ", "position": "กรรมการ", "createdAt": "2026-10-15T08:42:07.195Z", "firstName": "เศรษฐพงษ์", "updatedAt": "2026-10-15T09:29:27.915Z", "department": "คณะกรรมการโรงเรียนสาธิต", "academicRank": "", "displayOrder": 8}, {"id": "82103931-e8c1-4e62-b31d-59ef98271ab4", "email": null, "phone": null, "prefix": "พระมหา", "message": null, "imageUrl": "https://scontent.fbkk2-8.fna.fbcdn.net/v/t39.30808-6/475774635_4212520288987024_858744575231883121_n.jpg?stp=dst-jpg_tt6&cstp=mx1754x2048&ctp=s1754x2048&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFohqzHY-2fDQUWY6_FuIO6wJqufxvz1vPAmq5_G_PW8wGuEYNO-Fhcosh6UyGf7OU&_nc_ohc=LpI0T4OFzswQ7kNvwEk38Ia&_nc_oc=AdqbSsbH9nefyUbjXvIW3ujgiHgx1jszhCdU1akIIOL05kLnN_6y40wR6gGATQZR6cpjkrccrYMB6ipLQ_g1tf6n&_nc_zt=23&_nc_ht=scontent.fbkk2-8.fna&_nc_gid=lTvnCV_E3YqFZe94ER1U1g&_nc_ss=7b2a8&oh=00_AQOpOOtnFULWpCPp2UuH3fj6FfbaiVaoaIT6tf5nkulEig&oe=6AD67270", "isActive": true, "lastName": "เกสรเมธี", "position": "เจ้าอาวาสวัดทอง (ซอยจรัญสนิทวงศ์ 46) แขวงบางยี่ขัน กรรมการ", "createdAt": "2026-10-15T08:46:16.921Z", "firstName": "สวัสดิ์", "updatedAt": "2026-10-15T09:29:33.832Z", "department": "คณะกรรมการโรงเรียนสาธิต", "academicRank": "ดร. ป.ธ.๗", "displayOrder": 9}, {"id": "fa043363-7975-491d-8010-7b3e2e281589", "email": null, "phone": null, "prefix": "พระครูวินัยธร", "message": null, "imageUrl": "https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/597605167_1405953671541331_7484989085504107507_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1080&ctp=s1080x1080&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEkL5mrC2xMkGLP0hpxcCLtVQXrgQrM7ztVBeuBCszvO-ODFZ6k5XrenVmY0jTNhWY&_nc_ohc=iHDlyM6Pql8Q7kNvwGJ2W8p&_nc_oc=AdrORF358JrG5Bu54NVGslkv3rjgKjJWsCM0GUwU4MlFu_t1vtlPPvlZk5vSa_PFspjVY3cGjOu54ybXO9B-UeIF&_nc_zt=23&_nc_ht=scontent.fbkk2-7.fna&_nc_gid=49JVhxWY9xF1En77F1d4aQ&_nc_ss=7b2a8&oh=00_AQONke3mxbhff9PWWD_BFyQHbXSz-c_1NiZlAcprCbfL4Q&oe=6AD66AD1", "isActive": true, "lastName": "ฐิตปญฺโญ/พลเดช", "position": "ผู้ช่วยเจ้าอาวาสวัดพระเชตุพนวิมลมังคลาราม กรรมการ", "createdAt": "2026-10-15T08:50:39.856Z", "firstName": "เอกชัย", "updatedAt": "2026-10-15T09:29:39.533Z", "department": "คณะกรรมการโรงเรียนสาธิต", "academicRank": "ป.ธ. ๔ น.ธ. เอก พธ.บ. ค.ม.", "displayOrder": 10}, {"id": "dcd27046-7d2b-43ee-8220-b00b8ddf5251", "email": null, "phone": null, "prefix": "พระมหา", "message": null, "imageUrl": "/uploads/d991a639-87ca-4637-a7cf-f3fe13befc86.jpg", "isActive": true, "lastName": "สุญาโณ/ลือคำหาร", "position": "กรรมการ", "createdAt": "2026-10-15T09:01:32.652Z", "firstName": "ศุภชัย", "updatedAt": "2026-10-15T09:29:43.372Z", "department": "คณะกรรมการโรงเรียนสาธิต", "academicRank": "ป.ธ. ๖ น.ธ. เอก. ศน.บ.ศษ.ม.", "displayOrder": 11}, {"id": "4581cad4-9e1d-487c-be6c-3d5efe6f7dfe", "email": null, "phone": null, "prefix": "อาจารย์", "message": null, "imageUrl": "/uploads/ae644760-af00-4998-8c37-8e663d2e36b7.png", "isActive": true, "lastName": "หลังแก้ว", "position": "กรรมการ", "createdAt": "2026-10-15T09:05:30.923Z", "firstName": "สมพร", "updatedAt": "2026-10-15T09:29:47.222Z", "department": "คณะกรรมการโรงเรียนสาธิต", "academicRank": "น.ธ.เอก, ป.ธ. ๓, พธ.บ., ศศ.ม.", "displayOrder": 12}], "schoolInfo": {"fax": "035-248-001", "line": "@satitmcu", "email": "satit_mcu@mcu.ac.th", "motto": "ปญฺญา โลกสฺมิ ปชฺโชโต (ปัญญาเป็นแสงสว่างในโลก)", "phone": "091-860-585-4", "mapUrl": "https://maps.app.goo.gl/1V2qzZTyj8FQV3xA9", "nameEn": "SATIT MCU", "nameTh": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "vision": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย มุ่งมั่นจัดการศึกษาขั้นพื้นฐานตามมาตรฐานสากล บนพื้นฐานอัตลักษณ์วิถีพุทธ พัฒนาผู้เรียนให้มีความเป็นเลิศทางวิชาการ มีคุณธรรม จริยธรรม และมีทักษะศตวรรษที่ 21 เพื่อก้าวสู่ความเป็นพลเมืองโลก", "address": "ตึก มจร วัดมหาธาตุยุวราชรังสฤษฎิ์ราชวรมหาวิหาร 3 ถนน ท่าพระจันทร์ – วังหลัง แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพมหานคร 10200", "gallery": [{"id": "gal-1", "url": "https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/734094386_1592906822846014_4365439002370792525_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1367&ctp=s2048x1367&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFwfofs26EPDEFWtvQQj6wxOcdkDl2Y--Q5x2QOXZj75ILvFxp9pY0kUE3e25iIzsw&_nc_ohc=PkLBES24yvEQ7kNvwHzftoi&_nc_oc=Ado3tPzTaOrViIumf-9avCdGErWtPSgSFO4mZ6J9z8_Dm3RSTAkRkAvMLfXf_xXhwosZo6cHqkgH_dJP8zyjw3J_&_nc_zt=23&_nc_ht=scontent.fbkk2-7.fna&_nc_gid=xIW3M8ieJQ2GVAwiFUrTGA&_nc_ss=7b2a8&oh=00_AQNA90rViImhwqtVZtMbRbmABiFImF0t15BYy1ZQYApuDg&oe=6AD56925", "title": "ทัศนียภาพอาคารเรียนและบริเวณโรงเรียนสาธิต มจร", "createdAt": "2026-10-14T07:30:01.645Z", "description": "สภาพแวดล้อมที่ร่มรื่น สะอาด ปลอดภัย เอื้อต่อการเรียนรู้และการพัฒนาทักษะของผู้เรียน"}, {"id": "gal-2", "url": "https://scontent.fbkk2-8.fna.fbcdn.net/v/t39.30808-6/752699235_1612461634223866_8587772214290393956_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s2048x1365&_nc_cat=101&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEpDqeeGLLI_I_rPionDPCjvM70Vqc4yki8zvRWpzjKSLvKafri5ZVca6ZpXyPFm_8&_nc_ohc=d9EqW0C4zr0Q7kNvwF9E2Lz&_nc_oc=AdqYNZE4bckEI3Y7F7FbPI2iVVZg0otqRoR_N7kg9ne7acn2HuKIH9rclt4cU20MAVp14DnuvSEyYvbSnEGZ8B54&_nc_zt=23&_nc_ht=scontent.fbkk2-8.fna&_nc_gid=kpEwe1gS4mHq35w-m66j9g&_nc_ss=7b2a8&oh=00_AQP9nQt_4l265pwZtqti7WwpLZs9IS6Zup00afmYWDihsQ&oe=6AD5688B", "title": "กิจกรรมเสริมสร้างคุณธรรมและวิถีชาวพุทธ", "createdAt": "2026-10-14T07:30:01.645Z", "description": "การฝึกอบรมสมาธิ ภาวนา และการเรียนรู้หลักพุทธศาสนาบูรณาการในการดำเนินชีวิต"}], "history": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ก่อตั้งขึ้นภายใต้ความอุปถัมภ์ของมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย เพื่อเป็นสถานศึกษาต้นแบบในการจัดการศึกษาขั้นพื้นฐานที่มีคุณภาพระดับมาตรฐานสากล โดยมุ่งเน้นการบูรณาการองค์ความรู้ทางวิชาการสมัยใหม่เข้ากับคุณธรรม จริยธรรม และวิถีชาวพุทธ จัดการเรียนการสอนตั้งแต่ระดับมัธยมศึกษาตอนต้นถึงมัธยมศึกษาตอนปลาย เพื่อสร้างเยาวชนที่มีศักยภาพสูง มีความเป็นผู้นำ และมีจิตสาธารณะต่อสังคม", "logoUrl": "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg", "mission": ["ส่งเสริมและพัฒนาการจัดการเรียนรู้ที่เน้นผู้เรียนเป็นสำคัญ สอดคล้องกับหลักสูตรสถานศึกษาและทักษะแห่งอนาคต", "ปลูกฝังคุณธรรม จริยธรรม ตามหลักพุทธศาสนาและวิถีวัฒนธรรมไทยให้เป็นคนดีมีปัญญา", "พัฒนาระบบบริหารจัดการสถานศึกษาด้วยเทคโนโลยีดิจิทัลและสารสนเทศที่ทันสมัยอย่างมีประสิทธิภาพ", "ส่งเสริมความเป็นเลิศด้านภาษาไทย ภาษาบาลี และภาษาต่างประเทศเพื่อการสื่อสารระดับสากล", "สร้างเครือข่ายความร่วมมือทางการศึกษาระหว่างบ้าน วัด โรงเรียน มหาวิทยาลัย และองค์กรภายนอก"], "website": "https://satit.mcu.ac.th", "facebook": "https://www.facebook.com/SatitMahachula", "identity": "คุณธรรมเด่น เน้นภาษา ก้าวหน้าเทคโนโลยี", "shortName": "สาธิต มจร / SATIT MCU", "philosophy": "คุณธรรมนำความรู้ มุ่งสู่ความเป็นเลิศ เชิดชูความเป็นไทย ใส่ใจสากล", "treeFlower": "ต้นไม้ประจำมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร) คือ ต้นอโศก ซึ่งมีดอกสีแดงสด", "uniqueness": "วิถีพุทธ วิถีเรียนรู้ คู่คุณธรรม", "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3944151152177!2d100.48978989999999!3d13.755072400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2990016d91d3d%3A0xe20caf578932a06d!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZ4Liq4Liy4LiY4Li04LiV4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lih4Lir4Liy4LiI4Li44Lis4Liy4Lil4LiH4LiB4Lij4LiT4Lij4Liy4LiK4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii!5e0!3m2!1sth!2sth!4v1791967187909!5m2!1sth!2sth", "facebookTabs": "timeline", "schoolColors": "สีชมพู เป็นสีประจำวันพระราชสมภพ (วันอังคาร) ของพระบาทสมเด็จพระจุลจอมเกล้าเจ้าอยู่หัว (รัชกาลที่ 5) ซึ่งทรงสถาปนามหาวิทยาลัยขึ้นในปี พ.ศ. 2430 ในนามของ \\"มหาจุฬาลงกรณราชวิทยาลัย\\"", "coverImageUrl": "/uploads/cfd0ca66-3918-4fd8-aeaf-73bc0a81479a.jpg", "showMapWidget": true, "facebookPageUrl": "https://www.facebook.com/SatitMahachula", "mapCustomHeight": 450, "mapDisplayHeight": "compact", "facebookHideCover": false, "showFacebookWidget": true, "facebookDisplayMode": "plugin", "facebookSmallHeader": false, "facebookCustomHeight": 450, "facebookShowFacepile": true, "facebookDisplayHeight": "tall"}, "geminiApiKey": "", "heroSettings": {"slides": [{"id": "slide-1", "title": "ยินดีต้อนรับสู่ โรงเรียนสาธิต มจร", "imageUrl": "https://scontent.fbkk2-8.fna.fbcdn.net/v/t39.30808-6/489765384_1181073850695982_5971361311609765303_n.jpg?stp=dst-jpg_tt6&cstp=mx1904x861&ctp=s1904x861&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeG91uyvacmppb6dodQrgdFAwznttQzJJT_DOe21DMklP72DdB-YzmLhz51XqYSETYk&_nc_ohc=HOLEUHsF4LcQ7kNvwEJtTR8&_nc_oc=Adq6RT2uxNeIP1Z7oMccctq_v5RTnOHyXsVrb-fUIpYHeJI6tdABSVgCLucEco-RQkekoAuM-VYCWz_BWs0Gc-Vx&_nc_zt=23&_nc_ht=scontent.fbkk2-8.fna&_nc_gid=1Xm68wyJtH2ITIY-mT_ajA&_nc_ss=7b2a8&oh=00_AQOjsZla3tLuves0s-5cb4jzFMqoQWv6Mk-zMMZFYDbYzg&oe=6AD5540C", "isActive": true, "subtitle": "มุ่งมั่นพัฒนาวิชาการ ปลูกฝังคุณธรรม ก้าวทันเทคโนโลยีดิจิทัลสู่สากล", "buttonUrl": "", "buttonText": "", "displayOrder": 1}, {"id": "slide-2", "title": "“ปญฺญา โลกสฺมิ ปชฺโชโต (ปัญญาเป็นแสงสว่างในโลก)”", "imageUrl": "https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/753668460_1614218180714878_8758497212915786179_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s2048x1365&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE-R6qWyfyVwqb0_seJlcHUsU_9v4OQmqaxT_2_g5CapurHpqXxDtf3QxbajlgTSvk&_nc_ohc=CNkHQVjeS3kQ7kNvwGLfqzD&_nc_oc=AdojNbMRjExX2JWMMMQ9Qao2sTa9PzgdMyBMBjq4zP7Z6Gqrf3XvjYSRIJBE8GTczA12i4Ip6e5rtL8daIuKf-ZK&_nc_zt=23&_nc_ht=scontent.fbkk2-7.fna&_nc_gid=U90aNHwol1cXHu_-l_e_Mw&_nc_ss=7b2a8&oh=00_AQN6qgoOM9H7aqppQQs4FYiRLNeKoj-FBelgk4CaMErgog&oe=6AD562D8", "isActive": true, "subtitle": "คุณธรรมนำความรู้ มุ่งสู่ความเป็นเลิศ เชิดชูความเป็นไทย ใส่ใจสากล", "buttonUrl": "", "buttonText": "", "displayOrder": 2}, {"id": "slide-3", "title": "คุณธรรมเด่น เน้นภาษา ก้าวหน้าเทคโนโลยี", "imageUrl": "https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/733890456_1592905682846128_4424459320880923145_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1367&ctp=s2048x1367&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGJg5oppvLaOB1qOJoxyLrZzKX1U-zs0ifMpfVT7OzSJ6aRnn0DWQZhdsFknN_vj80&_nc_ohc=azJTp3b2AgsQ7kNvwEzxLCr&_nc_oc=AdqHtl7o_2wKd8MzmSBKLLVmHCXt9uQ57wkhbjnnulx6hDmz9JuAMfJkTp2KLaQY0JaVX41JQ4UoiuNBmSdPw8u7&_nc_zt=23&_nc_ht=scontent.fbkk2-7.fna&_nc_gid=60aahH-F83uKGgcVjntBRA&_nc_ss=7b2a8&oh=00_AQOwNUAtisBTiYbriRTksT74r001lp7iDLjAe5mownuO6A&oe=6AD57A54", "isActive": true, "subtitle": "มีความเป็นเลิศทางวิชาการ มีคุณธรรม จริยธรรม และมีทักษะศตวรรษที่ 21", "buttonUrl": "", "buttonText": "", "displayOrder": 3}], "coinSpeed": 1, "videoBgUrl": "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4", "description": "ศูนย์กลางบริการการศึกษาและบริหารงานโรงเรียนยุคใหม่ ครอบคลุมระบบข่าวสาร จัดการหลักสูตร ทำเนียบคณาจารย์ ระบบสารสนเทศงานทะเบียนและวัดผล และศูนย์ดาวน์โหลด", "displayMode": "slideshow", "show3DCoins": false, "showVideoBg": false, "eyebrowBadge": "SMART WEB PLATFORM • SATIT MCU", "headlinePart1": "พัฒนาปัญญา สร้างสรรค์วิชาการ", "headlinePart2": "สู่นวัตกรรมการศึกษาและบริหารจัดการที่ทันสมัย", "showParticles": false, "slideInterval": 3, "slideAnimation": "kenburns", "showDescription": false, "slideBrightness": "bright", "primaryButtonUrl": "https://www.facebook.com/SatitMahachula", "showEyebrowBadge": true, "primaryButtonText": "Facebook", "showHeadlinePart1": false, "showHeadlinePart2": false, "showPrimaryButton": false, "secondaryButtonUrl": "#news", "secondaryButtonText": "ข่าวประชาสัมพันธ์", "showSecondaryButton": false}, "footerSettings": {"contact": {"email": "อีเมล: satit_mcu@mcu.ac.th", "phone": "โทรศัพท์: 091-860-585-4", "title": "ติดต่อ & สถานที่ตั้ง", "mapUrl": "https://maps.app.goo.gl/1V2qzZTyj8FQV3xA9", "address": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ตึก มจร วัดมหาธาตุยุวราชรังสฤษฎิ์ราชวรมหาวิหาร 3 ถนน ท่าพระจันทร์ – วังหลัง แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพมหานคร 10200", "showMapLink": true, "operatingHours": "เวลาทำการ: จันทร์ - ศุกร์ 12:30 - 18:30 น."}, "services": [{"id": "srv-1", "url": "https://tv.mcu.ac.th/", "label": "MCU TV", "iconName": "Globe", "isActive": true, "displayOrder": 1, "openInNewTab": false}, {"id": "srv-2", "url": "http://oldweb.mcu.ac.th/mcutrai/", "label": "พระไตรปิฎก", "iconName": "Globe", "isActive": true, "displayOrder": 2, "openInNewTab": false}, {"id": "srv-3", "url": "https://mooc.mcu.ac.th/", "label": "MCU MOOC", "iconName": "BookOpen", "isActive": true, "displayOrder": 3, "openInNewTab": false}, {"id": "srv-4", "url": "https://ebook.mcu.ac.th/", "label": "หนังสือออนไลน์", "iconName": "FileText", "isActive": true, "displayOrder": 4, "openInNewTab": false}, {"id": "srv-1791972672637", "url": "https://www.mcu.ac.th/", "label": "MCU มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "iconName": "Globe", "isActive": true, "displayOrder": 5, "openInNewTab": false}], "staffLinks": [{"id": "stf-1", "url": "/login", "badge": "", "label": "เข้าสู่ระบบเจ้าหน้าที่", "isActive": true, "isButton": true, "displayOrder": 1, "openInNewTab": false}], "staffTitle": "สำหรับเจ้าหน้าที่", "themeColor": "pink", "socialLinks": {"lineUrl": "https://line.me", "youtubeUrl": "https://www.youtube.com/@mcudofficial6422", "facebookUrl": "https://www.facebook.com/SatitMahachula", "showSocials": true}, "visitorStats": {"title": "สถิติผู้เข้าชมเว็บไซต์", "enabled": true, "todayCount": 52, "totalCount": 46091, "onlineCount": 4, "autoTracking": true, "lastActiveDate": "2026-10-22"}, "copyrightText": "© 2026 SATIT MCU System. All rights reserved.", "servicesTitle": "ระบบงานบริการหลัก", "showBackToTop": true, "backgroundTheme": "warm", "brandDescription": "มุ่งมั่นจัดการศึกษาขั้นพื้นฐานตามมาตรฐานสากล บนพื้นฐานอัตลักษณ์ความเป็นไทยและคุณธรรมทางพระพุทธศาสนา ก้าวล้ำด้วยนวัตกรรมดิจิทัลเพื่อการเรียนรู้และการบริหารจัดการยุคใหม่", "copyrightSubtext": "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", "showSystemStatus": false, "smartCampusBadge": "Smart Campus", "systemStatusText": "ระบบบริการออนไลน์พร้อมใช้งาน (All Systems Operational)", "showSmartCampusBadge": false}}	t	2026-09-11 03:08:14.731+07	2026-10-22 10:35:43.368+07
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
a7fbf106-7988-4aad-8419-08c34c785545	41ad6f5d-55b9-4b21-8368-dfbaaabf276e	af1306cf-a62e-46c9-8557-929d8aa7748f	ALL	\N	2026-10-16 09:41:04.091+07
b89a191c-67ed-42ee-b962-f51f4350fb77	769db585-ac83-4966-8e4a-b14283c3bdc9	773c1a95-deb3-4c08-8183-8752579121ee	ALL	\N	2026-10-16 09:41:04.104+07
ac55f1ed-f687-41a4-802c-06d266a93fdf	e1302af4-15fe-426d-b4ab-03b9d56ba46f	ae8a4f75-9f72-4e71-9a7b-6d01080b7b26	ALL	\N	2026-10-16 09:41:04.116+07
25dc5e7e-48ea-4815-9730-3ede244d828f	ab6fe7fa-532a-4945-88c5-b08e6eda6984	5b7b77d3-23c7-4132-8134-fe06d86c69f9	ALL	\N	2026-10-16 09:41:04.129+07
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
41ad6f5d-55b9-4b21-8368-dfbaaabf276e	e4339f7d-52b1-49c2-8a55-1f3b8ca74a43	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-10-16 09:41:04.078+07
769db585-ac83-4966-8e4a-b14283c3bdc9	663148f2-b46d-4acd-8f18-b664148a5b1f	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-10-16 09:41:04.098+07
e1302af4-15fe-426d-b4ab-03b9d56ba46f	a375cd6b-9c7f-481f-aa08-3985320fe3fc	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-10-16 09:41:04.11+07
ab6fe7fa-532a-4945-88c5-b08e6eda6984	3194adc2-75cd-4735-aea5-4608c36e61a7	f6a68b18-b6d5-4cb8-be30-07ee1b3f9a7d	t	2026-10-16 09:41:04.122+07
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
3194adc2-75cd-4735-aea5-4608c36e61a7	student@satit.mcu.ac.th	$2b$12$R0L7qCfa725wfZKdBcQFk.KLauBcEy7y86NeZai0MUi3pN41KM2US	นายธนภัทร นักเรียนตัวอย่าง	\N	credentials	\N	t	t	f	\N	\N	2026-10-16 09:41:04.119+07	2026-10-16 09:41:04.119+07
e665ca42-7399-4354-bb6b-f9b75deb9829	admin@app.local	$2b$12$kj9HsI0m9bBOze0pKD/TVuTDCxzfWkTehmsIGfBv.btjvIaO/N/wy	ผู้ดูแลสูงสุด (Admin)	\N	credentials	\N	t	t	f	th	2026-10-22 06:31:15.682+07	2026-09-11 03:08:15.394+07	2026-10-22 06:31:15.683+07
e4339f7d-52b1-49c2-8a55-1f3b8ca74a43	academic@satit.mcu.ac.th	$2b$12$R0L7qCfa725wfZKdBcQFk.KLauBcEy7y86NeZai0MUi3pN41KM2US	เจ้าหน้าที่วิชาการศึกษา (งานทะเบียน)	\N	credentials	\N	t	t	f	\N	\N	2026-10-16 09:41:04.07+07	2026-10-16 09:41:04.07+07
663148f2-b46d-4acd-8f18-b664148a5b1f	teacher@satit.mcu.ac.th	$2b$12$R0L7qCfa725wfZKdBcQFk.KLauBcEy7y86NeZai0MUi3pN41KM2US	อาจารย์ผู้สอน ประจำชั้น	\N	credentials	\N	t	t	f	\N	\N	2026-10-16 09:41:04.095+07	2026-10-16 09:41:04.095+07
a375cd6b-9c7f-481f-aa08-3985320fe3fc	parent@satit.mcu.ac.th	$2b$12$R0L7qCfa725wfZKdBcQFk.KLauBcEy7y86NeZai0MUi3pN41KM2US	ผู้ปกครองนักเรียน	\N	credentials	\N	t	t	f	\N	\N	2026-10-16 09:41:04.106+07	2026-10-16 09:41:04.106+07
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
-- Name: courses_curriculum_id_course_code_academic_year_semester_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX courses_curriculum_id_course_code_academic_year_semester_key ON public.courses USING btree (curriculum_id, course_code, academic_year, semester);


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
-- Name: students_tenant_id_student_code_academic_year_semester_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX students_tenant_id_student_code_academic_year_semester_key ON public.students USING btree (tenant_id, student_code, academic_year, semester);


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

\unrestrict xWGbKhLVHq3peeGQQoeVCQVCFrI1uSgzMuxOBkg3htIsRdfE7uX6euBn2Z9tziC

