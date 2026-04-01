import { createFileRoute } from '@tanstack/react-router'
import SoftwareLicense from '../../pages/legal/SoftwareLicense'

export const Route = createFileRoute('/legal/software-license')({
  component: SoftwareLicense,
})
