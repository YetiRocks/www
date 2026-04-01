import { createFileRoute } from '@tanstack/react-router'
import UseCases from '../../pages/UseCases'

export const Route = createFileRoute('/solutions/use-cases')({
  component: UseCases,
})
