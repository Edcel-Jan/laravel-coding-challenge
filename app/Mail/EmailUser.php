<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class EmailUser extends Mailable
{
    use Queueable, SerializesModels;

    protected $id = 0;
    protected $code = 'none';
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($id, $code)
    {
        $this->id = $id;
        $this->code = $code;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $url = URL::to('/').'/register/'.$this->id."/".$this->code;
        $address = 'applicanturc@gmail.com';
        $subject = 'Registration Link';
        $name = 'Laravel Coding Challenge';
        return $this->view('email.index')->from($address, $name)->subject($subject)->with(['url_link' => $url]);
    }
}
