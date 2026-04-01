import { createFileRoute } from '@tanstack/react-router'
import SupportPolicy from '../../pages/legal/SupportPolicy'

export const Route = createFileRoute('/legal/support-policy')({
  component: SupportPolicy,
})
