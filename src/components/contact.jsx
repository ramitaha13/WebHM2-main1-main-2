import MainLayout from "../layouts/mainLayout";

export default function Contact() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <section className="mb-8">
          <h2 className="text-4xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-500">
            Contact Information
          </h2>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
            <p className="mb-4">
              For inquiries regarding permissions, content quality, or any other
              matter related to this website, please contact us at:
            </p>
            <ul className="list-disc pl-5">
              <li>
                <strong className="font-semibold">Email:</strong> jad.taha@braude.ac.il
              </li>
              <li>
                <strong className="font-semibold">Phone:</strong> +972537377777
              </li>
              <li>
                <strong className="font-semibold">Address:</strong> Tel-Aviv
              </li>
            </ul>
          </div>
          <p className="mt-4">
            We value our users and are committed to providing an exceptional
            experience on our website. Thank you for your understanding and
            cooperation.
          </p>
        </section>
      </div>
    </MainLayout>
  );
}
