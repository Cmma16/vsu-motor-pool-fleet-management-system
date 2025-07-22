@extends('errors::minimal')

@section('title', __('Page Expired'))
@section('code', '419')
@section('message', __('Page Expired'))

@section('message')
    <p>{{ __('Page Expired') }}</p>

    <a href="{{ url('/') }}"
       style="display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
        Go Back to Home
    </a>
@endsection