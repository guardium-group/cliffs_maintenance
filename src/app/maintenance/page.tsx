import MaintenanceClient from "./MaintenanceClient";

// TODO: Update title/description per client
export const metadata = {
  title: "Under Maintenance",
  description: "Our website is currently under maintenance. For emergencies, please call us directly.",
};

export default function MaintenancePage() {
  return <MaintenanceClient />;
}
