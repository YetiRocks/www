import { createFileRoute } from '@tanstack/react-router'
import Company from '../pages/Company'

export const Route = createFileRoute('/company')({
  component: Company,
})
