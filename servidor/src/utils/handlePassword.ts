import bcrypt from 'bcryptjs'

const SALT_NUM = 10

const encrypt = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_NUM)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

const verifyHash = async (
  plainPass: string,
  hashPass: string
): Promise<boolean> => {
  const isCorrect = await bcrypt.compare(plainPass, hashPass)
  return isCorrect
}

export { encrypt, verifyHash }
