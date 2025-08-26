import Breadcrumb from "./Breadcrumb";
import UserMenu from "./UserMenu";

export default function TopNav() {
  return (
    <div className="h-14 flex items-center justify-between w-full box-border">
      {/* Left side: Breadcrumb */}
      <Breadcrumb />

      {/* Right side: Profile icon + dropdown menu */}
      <div className="flex items-center gap-3 ">
        <UserMenu />
      </div>
    </div>
  );
}