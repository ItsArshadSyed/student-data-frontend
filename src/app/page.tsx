import { api } from "@/lib/api";

const Row = ({ label, value }: { label: string; value: string | number | boolean }) => (
  <div className="grid grid-cols-[200px_1fr] gap-6 py-2.5">
    <div className="text-gray-400">{label}</div>
    <div className="text-white">{String(value)}</div>
  </div>
);

export default async function DashboardPage() {
  const d = await api.dashboard();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ml-20 mr-16">
      {/* Personal Data + Degree Progress + Transfer Data (side by side) */}
      <section className="col-span-1 lg:col-span-1">
        <div className="grid grid-cols-3 gap-8">
          {/* Personal Data */}
          <div className="border border-white/60 pt-10 pr-10 pb-10 pl-12">
            <h2 className="text-white text-lg mb-6">Personal Data</h2>
            <div className="space-y-3">
              <Row label="Name" value={d.personal.name} />
              <Row label="Id" value={d.personal.id} />
              <Row label="Phone No" value={d.personal.phone} />
              <Row label="Email" value={d.personal.email} />
            </div>
          </div>
          {/* Degree Progress */}
          <div className="border border-white/60 pt-10 pr-10 pb-10 pl-12">
            <h2 className="text-white text-lg mb-6">Degree Progress</h2>
            <div className="space-y-3">
              <Row label="Bachelors" value={d.degreeProgress.bachelors} />
              <Row label="Discipline" value={d.degreeProgress.discipline} />
              <Row label="Join Date" value={d.degreeProgress.joinDate} />
            </div>
          </div>
          {/* Transfer Data */}
          <div className="border border-white/60 pt-10 pr-10 pb-10 pl-12">
            <h2 className="text-white text-lg mb-6">Transfer Data</h2>
            <div className="space-y-2">
              {d.transfer?.length
                ? d.transfer.map((t, i) => (
                    <Row key={i} label={t.title} value={t.value} />
                  ))
                : <div className="text-gray-400">No transfer items</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Graduation Data + Admin Notifications (side by side) */}
      <section className="col-span-1 lg:col-span-1 mt-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Graduation Data */}
          <div className="border border-white/60 pt-10 pr-10 pb-10 pl-12">
            <h2 className="text-white text-lg mb-6">Graduation Data</h2>
            <div className="space-y-3">
              <Row label="Email" value={d.graduation.email} />
              <Row label="Phone No" value={d.graduation.phone} />
              <Row label="Alternate Email" value={d.graduation.alternateEmail} />
              <Row label="Address" value={d.graduation.address} />
            </div>
          </div>
          {/* Admin Notifications */}
          <div className="col-span-1 border border-white/60 pt-10 pr-10 pb-10 pl-12">
            <h2 className="text-white text-lg mb-6">Admin Notifications</h2>
            <div className="space-y-3">
              <Row label="Fee Payment" value={d.adminNotifications.feePayment} />
              <Row label="Last Date" value={d.adminNotifications.lastDate} />
              <Row label="Upload Certificate" value={d.adminNotifications.uploadCertificate} />
              <Row label="Pending Status" value={d.adminNotifications.pendingStatus} />
            </div>
          </div>
              
      
        </div>
      </section>
    </div>
  );
}