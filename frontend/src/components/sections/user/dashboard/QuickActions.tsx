import { DashboardSectionHeader } from '@/components/reusable/shared'
import { Zap } from 'lucide-react'

const QuickActions = () => {
    return (
        <div className="space-y-6 quick-actions-section">
            <DashboardSectionHeader
  mainIcon={<Zap className="size-8 stroke-3" />}
  mainHeading="Quick Actions"
  subIcon={<Zap className="size-5" />}
  subText="Perform important tasks swiftly with just a few clicks."
  animateClassName="quick-actions-header"
/>

        </div>
    )
}

export default QuickActions