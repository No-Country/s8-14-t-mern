import { Document } from 'mongoose'

export interface IBenefice extends Document {
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
  image_1: string
  image_2: string
  image_3: string
}
