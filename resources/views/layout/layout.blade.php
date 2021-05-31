<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
            rel="stylesheet"
        />

        <style>
            body {
                font-family: "Nunito", sans-serif;
            }
        </style>
        <link rel="stylesheet" href="{{ asset('css/app.css') }}" />
        <title>@yield('title_name') | Laravel Coding Challenge</title>
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Laravel Coding Challenge</a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                @if(Auth::user())
                <ul class="navbar-nav mr-auto">
                    @if(Auth::user()->role->name == "admin")
                    <li class="nav-item active">
                        <a class="nav-link" href="/admin/referals"
                            >Email List
                        </a>
                    </li>
                    @else
                    <li class="nav-item active">
                        <a class="nav-link" href="/user/invite">Home</a>
                    </li>

                    @endif
                </ul>
                <form
                    method="post"
                    action="{{ route('logout') }}"
                    class="form-inline my-2 my-lg-0 mr-5"
                >
                    @csrf
                    <button class="btn btn-primary" type="submit">
                        Logout
                    </button>
                </form>
                @endif
            </div>
        </nav>

        @yield('content')
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
