<script lang="ts">
  type Job = {
    employer: string;
    title: string;
    startDate: Date;
    endDate: Date;
    description?: string;
    tasks: Array<string>;
  };
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  export const title = 'Work Experience';
  export const currentDate = new Date();
  export function dateToString(date: Date) {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }
  export const jobs: Array<Job> = [
    {
      employer: 'CWRU Department of Computer and Data Sciences',
      title: 'Teaching Assistant',
      startDate: new Date(2020, 8),
      endDate: new Date(currentDate.getFullYear(), currentDate.getMonth()),
      description:
        'CSDS 391: Introduction to Artificial Intelligence, CSDS 343: Theoretical Computer Science',
      tasks: [
        'Designed and graded course assignments and exams',
        'Taught supplementary lectures to reinforce course material',
        'Hosted weekly office hours to answer questions and provide feedback on theoretical written work and programming assignments',
      ],
    },
    {
      employer: 'Johns Hopkins University Applied Physics Laboratory',
      title: 'Machine Learning & Software Engineering Intern',
      startDate: new Date(2020, 3),
      endDate: new Date(2020, 7),
      tasks: [
        'Designed random forest, Bayesian network, and deep learning models for viral and bacterial threat classification using Scikit-Learn, Tensorflow, and Keras',
        'Implemented a data processing pipeline using dna2vec to perform feature extraction and dimensionality reduction from sequenced DNA',
        'Contributed to a large scale Angular application to provide an online learing approach to automated document tagging and classification',
      ],
    },
    {
      employer: 'Johns Hopkins University Applied Physics Laboratory',
      title: 'Software Engineering Intern',
      startDate: new Date(2019, 4),
      endDate: new Date(2020, 7),
      tasks: [
        'Worked in a Kanban development environment to quickly and effectively produce thoroughly documented, tested software for contract sponsors',
        'Contributed to an Android application written in Java and Kotlin to implement an attachment cache mechanism, reducing form upload time by as much as 75%',
        'Developed a web application with spring boot backend, Angular frontend, and Selenium unit tests, utilizing an internally designed UI library to deliver Elasticsearch social media analytics',
      ],
    },
    {
      employer: 'Agriplex Genomics',
      title: 'Software Engineering Intern',
      startDate: new Date(2018, 8),
      endDate: new Date(2019, 4),
      tasks: [
        'Developed a job scheduling application from scratch in Angular and designed an algorithm to optimize job scheduling to increase data throughput.',
        'Designed a Postgres database model to store jobs and their associated data, and built a corresponding REST API to allow application interaction.',
        'Created an Amazon AWS management server to create and destroy EC2 instances to efficiently allocate funds and expedite job processing.',
      ],
    },
  ];
</script>

<span class="anchor bg-primary" id="experience" />
<div class="experience page bg-primary">
  <div class="container">
    <h1 class="header pt-3">{title}</h1>
    <div class="wow fadeIn py-3 my-auto text-dark row">
      {#each jobs as job}
        <div class="col-sm-12">
          <div class="card m-2 wow zoomIn">
            <div class="card-body">
              <h5 class="card-title text-dark">{job.employer}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                {job.title}, {dateToString(job.startDate)} - {dateToString(
                  job.endDate,
                )}
              </h6>
              {job.description ?? ''}
              <ul class="card-text text-dark">
                {#each job.tasks as task}
                  <li>{task}</li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
