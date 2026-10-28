import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Gi from "react-icons/gi";
const ICONS = { ...Fa, ...Fa6, ...Gi };
export default function Icon({ name, className = "" }) {
  const C = ICONS[name];
  return C ? <C className={className} /> : null;
}
