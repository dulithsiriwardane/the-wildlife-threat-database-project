const stepNames = ["Choose account type", "Enter details", "Add a profile photo"];

export function SignupProgress({step}) {
  return (
    <div className="mb-6">
      <p className="mb-2 flex flex-wrap items-baseline gap-x-2 text-sm">
        <span className="font-semibold">Step {step} of 3</span>
        <span className="text-zinc-600">{stepNames[step - 1]}</span>
      </p>
      <div aria-hidden="true" className="flex gap-2">
        {stepNames.map(function renderSegment(name, index) {
          const color = index < step ? "bg-twtdbp-crimson" : "bg-zinc-200";
          return <span key={name} className={`h-1 flex-1 rounded-full ${color}`} />;
        })}
      </div>
    </div>
  );
}
