import { Document } from 'mongoose'

export enum CardType {
  transport = 'transport',
  cellPhone = 'cell phone'
} 

export interface ICard extends Document {
  numberCard: number
  cardType: CardType
  image: string
  name: string
}