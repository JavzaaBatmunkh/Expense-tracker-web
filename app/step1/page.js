import Image from "next/image";


export default function Page() {
    return (
        <main className="  h-screen">

            <div className="flex gap-2 mb-8">
                <Image src="/Geld-logo.svg" width={1200} height={1200} className="w-[45px]" />
                <Image src="/Geld.svg" width={1200} height={1200} className="w-[90px]" />
            </div>
            <div class="stepper-wrapper">
                <div class="stepper-item completed">
                    <div class="step-counter">1</div>
                    <div class="step-name">First</div>
                </div>
                <div class="stepper-item completed">
                    <div class="step-counter">2</div>
                    <div class="step-name">Second</div>
                </div>
                <div class="stepper-item active">
                    <div class="step-counter">3</div>
                    <div class="step-name">Third</div>
                </div>
            </div>


        </main>
    );
}