import Breadcrumb from "./Breadcrumb";
import UserMenu from "./UserMenu";
export default function TopNav() {
  return (
    <div className="h-14 flex items-center justify-between px-4">
      <Breadcrumb />
      <UserMenu />
    </div>
  );
}