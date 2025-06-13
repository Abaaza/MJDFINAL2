import { DashboardLayout } from "@/components/dashboard-layout"
import { QuotationDetail } from "@/components/quotation-detail"

export default async function QuotationDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  return (
    <DashboardLayout>
      <QuotationDetail quotationId={id} />
    </DashboardLayout>
  )
}
