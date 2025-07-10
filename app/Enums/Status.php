<?php

namespace App\Enums;

enum Status: string
{
    case PENDING = 'Pending';
    case IN_PROCESS = 'In Process';
    case COMPLETED = 'Completed';
}
