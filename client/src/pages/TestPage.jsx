import { Input } from "../components/ui/Input";
import { useForm } from "react-hook-form";

function NewPage() {
  const { register, handleSubmit, errors } = useForm();

  return (
    <div>
      <form>

        <Input {...register("name", { required: true })} />
        <Input />
        <Input />
        <Input />

      </form>
    </div>
  );
}
export default NewPage;
