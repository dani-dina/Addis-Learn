const ERROR_MESSAGES = {
  // Generic
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access Forbidden',
  CONFLICT: 'Conflict occurred',
  UNPROCESSABLE_ENTITY: 'Unprocessable Entity',

  // User-related
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  INVALID_CREDENTIALS: 'Invalid email or password',

  // Course-related
  COURSE_NOT_FOUND: 'Course not found',
  LESSON_NOT_FOUND: 'Lesson not found',
  COURSE_ALREADY_ENROLLED: 'You are already enrolled in this course',

  // Profile/Freelancer-related
  PROFILE_NOT_FOUND: 'Profile not found',
  SKILL_ALREADY_EXISTS: 'Skill already exists',

  // Student-related
  STUDENT_NOT_FOUND: 'Student not found',
  COURSE_NOT_IN_WISHLIST: 'Course is not in wishlist',

  // Validation
  VALIDATION_ERROR: 'Validation error',
} as const;

export default ERROR_MESSAGES;