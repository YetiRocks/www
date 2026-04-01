import { createFileRoute } from '@tanstack/react-router'
import Platform from '../pages/Platform'

export const Route = createFileRoute('/platform')({
  component: Platform,
})
