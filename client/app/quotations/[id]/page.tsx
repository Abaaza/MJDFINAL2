import { DashboardLayout } from "@/components/dashboard-layout"
import { QuotationDetail } from "@/components/quotation-detail"

export default function QuotationDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  return (
    <DashboardLayout>
      <QuotationDetail quotationId={id} />
    </DashboardLayout>
  )
}
