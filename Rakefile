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