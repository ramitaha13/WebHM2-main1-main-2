import MainLayout from "../layouts/mainLayout";

export default function About() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-500">
          Website Policy
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            All Rights Reserved
          </h2>
          <p className="mb-4">
            This website and all of its content, including but not limited to
            text, images, graphics, data, and software, are the exclusive
            property of Kareem Zeedan, Rami Taha, Jad Taha, and Mohammed
            Khateeb. All rights reserved. No part of this website may be
            reproduced, distributed, or transmitted in any form or by any means,
            including photocopying, recording, or other electronic or mechanical
            methods, without the prior written permission of the owners, except
            in the case of brief quotations embodied in critical reviews and
            certain other non-commercial uses permitted by copyright law.
          </p>
          <p className="mb-4">
            Unauthorized use or duplication of any material on this website
            without express and written permission from the owners is strictly
            prohibited.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Key Features:
          </h2>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">
              <strong className="font-semibold">Analyze Excel Files:</strong>{" "}
              Easily import and analyze your Excel files to extract meaningful
              insights and trends.
            </li>
            <li className="mb-2">
              <strong className="font-semibold">Advanced Filtering:</strong>{" "}
              Apply filters based on specific columns to quickly find the data
              you need.
            </li>
            <li className="mb-2">
              <strong className="font-semibold">Combine Multiple Files:</strong>{" "}
              Merge more than two Excel files seamlessly, ensuring your data is
              always organized and accessible.
            </li>
            <li className="mb-2">
              <strong className="font-semibold">
                Custom Column Filtering:
              </strong>{" "}
              Tailor your data views by filtering columns to focus on the
              information that matters most. and trends in video content.
            </li>
            <li className="mb-2">
              <strong className="font-semibold">Download Custom Files:</strong>{" "}
              Export your filtered and combined data into new Excel files, ready
              for download and further use.
            </li>
            <li className="mb-2">
              <strong className="font-semibold">Data Visualization:</strong>{" "}
              Create pie charts and plots to visualize your data, making it
              easier to understand and present.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Commitment to Quality
          </h2>
          <p className="mb-4">
            We are committed to providing the highest quality video data to our
            users. Our team meticulously curates and verifies content to ensure
            that it meets the highest standards of accuracy and reliability.
            This includes:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">
              <strong className="font-semibold">Accurate Data:</strong> All
              video data provided on our website is sourced from reputable and
              verified sources. We ensure the accuracy and reliability of the
              data by conducting thorough checks and validations.
            </li>
            <li className="mb-2">
              <strong className="font-semibold">
                Comprehensive Information:
              </strong>{" "}
              We provide detailed and comprehensive information about each
              video, including metadata, descriptions, ratings, and statistics,
              to offer users a complete understanding of the content.
            </li>
            <li className="mb-2">
              <strong className="font-semibold">
                User-Friendly Presentation:
              </strong>{" "}
              Our video data is presented in a clear and user-friendly manner.
              We use intuitive designs and interfaces to make it easy for users
              to access and interpret the information.
            </li>
            <li className="mb-2">
              <strong className="font-semibold">Continuous Updates:</strong> We
              are committed to keeping our data current and relevant. We
              regularly update our database to reflect the latest information
              and trends in video content.
            </li>
            <li className="mb-2">
              <strong className="font-semibold">
                Feedback and Improvement:
              </strong>{" "}
              We actively seek feedback from our users to improve the quality
              and presentation of our video data. We use this feedback to
              enhance our content and ensure it meets the needs and expectations
              of our audience.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            User Responsibility
          </h2>
          <p className="mb-4">
            By accessing this website, users agree to respect the intellectual
            property rights of Kareem Zeedan, Rami Taha, and Mohammed Khateeb.
            Users also agree not to engage in any unauthorized activities,
            including but not limited to copying, distributing, or altering any
            content without prior permission.
          </p>
          <p className="mb-4">
            Users are encouraged to report any violations of these terms to our
            support team. We take all reports seriously and will take
            appropriate action to protect our intellectual property and maintain
            the integrity of our content.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Updates to Policy
          </h2>
          <p className="mb-4">
            This policy may be updated from time to time to reflect changes in
            our practices or legal requirements. We encourage users to review
            this policy periodically to stay informed about our terms and
            conditions.
          </p>
        </section>
      </div>
    </MainLayout>
  );
}
