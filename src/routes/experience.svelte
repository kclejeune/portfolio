<script lang="ts">
	import Card from '../components/Card.svelte';
	import Page from '../components/Page.svelte';
	import { primaryBackground, neutralBackground } from '../utils/constants';

	type Job = {
		employer: string;
		title: string;
		startDate: Date;
		endDate: Date;
		description?: string;
		tasks: string[];
		tags?: string[];
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
		'December'
	];
	const currentDate = new Date();
	function dateToString(date: Date) {
		return `${months[date.getMonth()]} ${date.getFullYear()}`;
	}
	function formatDateString(start: Date, end: Date) {
		return `${dateToString(start)} - ${dateToString(end) ?? 'Present'}`;
	}
	const jobs: Array<Job> = [
		{
			employer: 'CWRU Department of Computer and Data Sciences',
			title: 'Teaching Assistant',
			startDate: new Date(2020, 8),
			endDate: new Date(currentDate.getFullYear(), currentDate.getMonth()),
			description:
				'Classes: CSDS 391: Introduction to Artificial Intelligence, CSDS 343: Theoretical Computer Science',
			tasks: [
				'Designed and graded course assignments and exams',
				'Taught supplementary lectures to reinforce course material',
				'Hosted weekly office hours to answer questions and provide feedback on theoretical written work and programming assignments'
			],
			tags: [
				'Machine Learning',
				'Reinforcement Learning',
				'Bayesian Networks',
				'Theory of Computation'
			]
		},
		{
			employer: 'Johns Hopkins University Applied Physics Laboratory',
			title: 'Machine Learning & Software Engineering Intern',
			startDate: new Date(2020, 3),
			endDate: new Date(2020, 7),
			tasks: [
				'Designed random forest, Bayesian network, and deep learning models for viral and bacterial threat classification using Scikit-Learn, Tensorflow, and Keras',
				'Implemented a data processing pipeline using dna2vec to perform feature extraction and dimensionality reduction from sequenced DNA',
				'Contributed to a large scale Angular application to provide an online learing approach to automated document tagging and classification'
			],
			tags: ['Python', 'Machine Learning', 'Tensorflow', 'dna2vec']
		},
		{
			employer: 'Johns Hopkins University Applied Physics Laboratory',
			title: 'Software Engineering Intern',
			startDate: new Date(2019, 4),
			endDate: new Date(2020, 7),
			tasks: [
				'Worked in a Kanban development environment to quickly and effectively produce thoroughly documented, tested software for contract sponsors',
				'Contributed to an Android application written in Java and Kotlin to implement an attachment cache mechanism, reducing form upload time by as much as 75%',
				'Developed a web application with spring boot backend, Angular frontend, and Selenium unit tests, utilizing an internally designed UI library to deliver Elasticsearch social media analytics'
			],
			tags: ['Java', 'Kotlin', 'Angular', 'Typescript', 'Selenium']
		},
		{
			employer: 'Agriplex Genomics',
			title: 'Software Engineering Intern',
			startDate: new Date(2018, 8),
			endDate: new Date(2019, 4),
			tasks: [
				'Developed a job scheduling application from scratch in Angular and designed an algorithm to optimize job scheduling to increase data throughput.',
				'Designed a Postgres database model to store jobs and their associated data, and built a corresponding REST API to allow application interaction.',
				'Created an Amazon AWS management server to create and destroy EC2 instances to efficiently allocate funds and expedite job processing.'
			],
			tags: ['Angular', 'Typescript', 'Postgres', 'AWS']
		}
	];
</script>

<Page id="experience" title="Work Experience" backgroundClass={neutralBackground}>
	<div
		class="container grid max-w-screen-xl gap-4 mx-auto md:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-4"
	>
		{#each jobs as job}
			<Card
				title={job.employer}
				subtitle={`${job.title}, ${formatDateString(job.startDate, job.endDate)}`}
				tags={job.tags}
			>
				{#if job.description}
					<div class="mb-1">
						{job.description ?? ''}
					</div>
				{/if}
				<ul class="m-2 list-disc">
					{#each job.tasks as task}
						<li>{task}</li>
					{/each}
				</ul>
			</Card>
		{/each}
	</div>
</Page>
