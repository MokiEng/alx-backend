import kue from 'kue';

// Create a job data object
const jobData = {
  phoneNumber: '1234567890',
  message: 'Notification message content',
};

// Create a Kue queue
const queue = kue.createQueue();

// Create a job and add it to the queue
const job = queue.create('push_notification_code', jobData).save((err) => {
  if (!err) {
    console.log(`Notification job created: ${job.id}`);
  } else {
    console.log('Job creation failed:', err);
  }
});

// Listen for job completion event
job.on('complete', () => {
  console.log('Notification job completed');
});

// Listen for job failed event
job.on('failed', () => {
  console.log('Notification job failed');
});
