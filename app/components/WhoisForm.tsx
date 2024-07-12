import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

const schema = z.object({
  domain: z.string().min(1, "Domain name is required"),
  infoType: z.enum(["domain", "contact"]),
});

type FormData = z.infer<typeof schema>;

interface WhoisFormProps {
  onSubmit: (data: FormData) => void;
  error?: string | null;
  onInfoTypeChange: (infoType: string, domain: string) => void;
}

const WhoisForm: React.FC<WhoisFormProps> = ({ onSubmit, onInfoTypeChange }) => {
  const { watch, getValues, register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const infoType = watch("infoType");
  const domainChange = getValues("domain");

  useEffect(() => {
    onInfoTypeChange(infoType, domainChange);
  }, [infoType, onInfoTypeChange, domainChange]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <div className="w-[250px]">
          <label htmlFor="domain" className="font-semibold">Domain Name:</label>
        </div>
        <input 
          id="domain"
          className="border px-2 py-1 rounded text-gray-400 w-[300px]"
          placeholder="Enter domain here"
          {...register('domain', { 
            required: 'Domain name is required',
            pattern: {
              value: /^[a-zA-Z0-9-]{1,63}\.[a-zA-Z]{2,}$/,
              message: 'Invalid domain name format'
            }
          })} 
        />
        {errors.domain && <p className="text-red-500">{errors.domain.message}</p>}
      </div>
      <div className="space-y-1">
        <div className="w-[250px]">
         <label htmlFor="infoType" className="font-semibold">Information Type:</label>
        </div>
        <select 
          id="infoType"
          className="border px-2 py-1 rounded text-gray-400 w-[300px]"
          {...register("infoType")}
        >
          <option value="domain">Domain Information</option>
          <option value="contact">Contact Information</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-1/4">Lookup</button>
      {errors.infoType && <p className="text-red-500">Information type is required</p>}
    </form>
  );
};

export default WhoisForm;
