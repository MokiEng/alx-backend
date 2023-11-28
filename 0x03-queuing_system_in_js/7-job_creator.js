import kue from 'kue';

// Array of jobs
const jobs = [
  { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
  { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
  // ... (other job objects)
  { phoneNumber: '4151218782', message: 'This is the code 4321 to verify your account' },
];

// Create a Kue queue
const queue = kue.createQueue();

// Process jobs in the array
jobs.forEach((jobData, index) => {
  // Create a job for each object in the array
  const job = queue.create('push_notification_code_2', jobData);

  // On successful job creation
  job.save((err) => {
    if (!err) console.log(`Notification job created: ${job.id}`);
  });

  // On completion of the job
  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
    kue.Job.get(job.id, (_, jobInstance) => {
      jobInstance.remove(() => {
        console.log(`Removed completed job ${job.id} from queue`);
      });
    });
  });

  // On job failure
  job.on('failed', (err) => {
    console.log(`Notification job ${job.id} failed: ${err}`);
  });

  // On job progress
  job.on('progress', (progress) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });

  // Enqueue the job
  job.delay(1000 * index).attempts(3).save();
});
