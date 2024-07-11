import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  domain: z.string().min(1, "Domain name is required"),
  infoType: z.enum(["domain", "contact"]),
});

type FormData = z.infer<typeof schema>;

interface WhoisFormProps {
  onSubmit: (data: FormData) => void;
}

const WhoisForm: React.FC<WhoisFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="domain">Domain Name:</label>
        <input id="domain" {...register("domain")} className="border ml-2 p-2 rounded text-gray-400"/>
        {errors.domain && <p className="text-red-500">{errors.domain.message}</p>}
      </div>
      <div>
        <label htmlFor="infoType">Information Type:</label>
        <select id="infoType" {...register("infoType")} className="border ml-2 p-2 rounded text-gray-400">
          <option value="domain">Domain Information</option>
          <option value="contact">Contact Information</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Lookup</button>
    </form>
  );
};

export default WhoisForm;
