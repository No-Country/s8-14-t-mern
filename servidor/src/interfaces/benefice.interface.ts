import { Document } from 'mongoose'
export interface Benefice extends Document {
  name: string
  category: string
  description: string
  startDate: Date
  endDate: Date
  isActive?: boolean
  discountPercentage?: number
  cashback?: number
  promoCode?: string
  theBest?: boolean
  typeBenefice?: string
}
