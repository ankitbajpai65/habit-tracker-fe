export function validateName(name: string) {
  const nameRegex = /^[A-Za-z]{3,20}$/;
  if (!nameRegex.test(name)) {
    return {
      valid: false,
      message: "Name must contain only alphabets and be 3-20 characters long.",
    };
  }
  return { valid: true, message: "Valid name" };
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Invalid email format." };
  }
  return { valid: true, message: "Valid email format" };
}

export function validatePassword(password: string) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  if (!passwordRegex.test(password)) {
    return {
      valid: false,
      message:
        "Password must be 8-15 characters long, include at least 1 uppercase, 1 lowercase, and 1 special character.",
    };
  }
  return {
    valid: true,
    message: "valid password",
  };
}
