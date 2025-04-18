import Image from "next/image";

export default function Clients() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Нашите клиенти
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Наши клиенти са български и чуждестранни физически и юридически
              лица. Консултираме и представляваме търговски дружества в сферите
              на услугите, строителството, енергетиката, както и продуцентски
              компании, банкови и небанкови финансови институции,
              неправителствени организации. С оглед всеобхватната защита на
              интересите на своите клиенти, кантората си сътрудничи с широка
              гама от специалисти, в това число счетоводители, инженери,
              застрахователи и др.
            </p>
          </div>
          <div className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none lg:pl-8">
            {/* Първи ред - 4 лога */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div
                  key={`client-${index + 1}`}
                  className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-2 shadow-sm transition hover:shadow-md"
                >
                  <Image
                    alt={`Клиент ${index + 1}`}
                    src={`/client-${index + 1}.jpg`}
                    width={200}
                    height={140}
                    quality={90}
                    loading="lazy"
                    className="w-full h-auto object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Втори ред - 4 лога */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div
                  key={`client-${index + 5}`}
                  className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-2 shadow-sm transition hover:shadow-md"
                >
                  <Image
                    alt={`Клиент ${index + 5}`}
                    src={`/client-${index + 5}.jpg`}
                    width={200}
                    height={140}
                    quality={90}
                    loading="lazy"
                    className="w-full h-auto object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Трети ред - последните 2 лога центрирани */}
            <div className="mt-8 flex justify-center gap-8">
              <div className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-2 shadow-sm transition hover:shadow-md max-w-xs w-full">
                <Image
                  alt="Клиент 9"
                  src="/client-9.jpg"
                  width={200}
                  height={140}
                  quality={90}
                  loading="lazy"
                  className="w-full h-auto object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-2 shadow-sm transition hover:shadow-md max-w-xs w-full">
                <Image
                  alt="Клиент 10"
                  src="/client-10.jpg"
                  width={200}
                  height={140}
                  quality={90}
                  loading="lazy"
                  className="w-full h-auto object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
