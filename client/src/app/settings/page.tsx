import Title from "../components/common/title"
import SettingsMainLayout from "../components/settings/main/layout";

const Settings = () => {
  return (
    <div className="mb-64">
      <div className="pt-[1rem] pl-[1rem] border-bottom">
        <Title title={"設定"} />
      </div>
      <div className="w-full flex justify-between">
        <SettingsMainLayout />
      </div>
    </div>
  )
}

export default Settings;