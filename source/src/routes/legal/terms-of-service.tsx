import { createFileRoute } from '@tanstack/react-router'
import TermsOfService from '../../pages/legal/TermsOfService'

export const Route = createFileRoute('/legal/terms-of-service')({
  component: TermsOfService,
})
