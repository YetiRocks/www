import { createFileRoute } from '@tanstack/react-router'
import AI from '../../pages/AI'

export const Route = createFileRoute('/solutions/ai')({
  component: AI,
})
