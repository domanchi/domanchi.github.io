require 'html-proofer'

desc 'build and test website'
task :test do
    sh 'bundle exec jekyll build --source docs/'
    HTMLProofer.check_directory(
        './_site',
        {
            :verbose => true,
            # This is needed, because our links don't end with `.html`, but our raw files do.
            :assume_extension => true,

            # This is needed by Bootstrap dropdowns, and makes the test unnecessarily complain.
            :allow_hash_href => true,

            :http_status_ignore => [
                # It looks like LinkedIn blocked htmlproofer, so we need to explicitly ignore
                # this error code. https://github.com/gjtorikian/html-proofer/issues/336
                999,
            ],

            # Fails if image is HTTP
            :check_img_http => true,

            # Fails if links are HTTP
            :enforce_https => true,

            # TODO: Need to create a favicon first.
            :check_favicon => false,

            # Ensures valid HTML
            # NOTE: Nokogiri (the engine) doesn't seem to support HTML5.
            # https://github.com/gjtorikian/html-proofer/issues/318
            :check_html => false,
        }
    ).run
end