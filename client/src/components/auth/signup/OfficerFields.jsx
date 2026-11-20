import {SignupField} from "./SignupField";
import {AddressFields} from "./AddressFields";

export function OfficerFields({draft, onChange}) {
  const props = {draft, onChange};
  return (
    <fieldset className="min-w-0 space-y-4 rounded-2xl border border-zinc-200 p-4 sm:p-5">
      <legend className="px-1 font-semibold">Work information</legend>
      <div className="grid gap-4 sm:@sm:grid-cols-2">
        <SignupField {...props} name="designation" label="Designation" options={["Veterinarian", "Zoologist", "Wildlife officer"]} />
        <SignupField {...props} name="officePhone" label="Office phone number" type="tel" autoComplete="section-office tel" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Work address</p>
        <AddressFields {...props} prefix="work" autoCompletePrefix="section-office " />
      </div>
    </fieldset>
  );
}
