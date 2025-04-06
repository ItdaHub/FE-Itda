// CustomSwitch.tsx
import { Switch } from "antd";

interface Props {
  checked: boolean;
  onChange: () => void;
}

const CustomSwitch = ({ checked, onChange }: Props) => {
  return <Switch checked={checked} onChange={onChange} />;
};

export default CustomSwitch;
