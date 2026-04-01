import { createFileRoute } from '@tanstack/react-router'
import Applications from '../../pages/Applications'

export const Route = createFileRoute('/developers/getting-started')({
  component: Applications,
})
